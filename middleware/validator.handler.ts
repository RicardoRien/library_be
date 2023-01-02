import type { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

export const validate = (schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>, property: keyof Request) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req[property])
      return next()
    } catch (error) {
      let err = error
      if (err instanceof z.ZodError) {
        err = err.issues.map((e) => ({ path: e.path[0], message: e.message }))
      }
      return res.status(409).json({
        status: 'failed',
        error: err,
      })
    }
}

export const validatorHandler = (schema: any) => (req: Request, res: Response, next: NextFunction) => {

  const params: Record<string, any> = {...req.params}

  if(params.id) {
    params.id = +params.id
  }

  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params
    })

    return next()

  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log('> > > req.query: ', err)
      return res.status(400).json(err.issues.map(issue => ({
        path: issue.path,
        message: issue.message,
      })))
    } else {
      return res.status(400)
    }
  }
}
