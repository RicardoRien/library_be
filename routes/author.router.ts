import { Author } from '@prisma/client'
import express from 'express'
import { validatorHandler } from '../middleware/validator.handler'
import { createUserSchema, getAuthorSchema } from '../schemas/author.schema'
import AuthorService from '../services/author.service'

const router = express.Router()
const service = new AuthorService

router.get('/',
  async (_req, res, next) => {
    try {
      const allAuthors = await service.find()
      res.json({ data: allAuthors })
    } catch (error) {
      next(error)
    }
  }
)

router.post('/',
  validatorHandler(createUserSchema),
  async (req, res, next) => {
    try {
      const body = req.body
      const newAuthor = await service.createAuthor(body)
      res.status(201).json({ data: newAuthor })
    } catch (error) {
      next(error)
    }
  }
)

router.get('/:id',
  validatorHandler(getAuthorSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const author: any = await service.findById(+id)
      res.json({ data: author })
    } catch (error) {
      next(error)
    }
  }
)

router.put('/:id',
  validatorHandler(getAuthorSchema),
  validatorHandler(createUserSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const authorUpdated: Author | any = await service.updateAuthor(+id, body)
      res.status(201).json({ data: authorUpdated })
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:id',
  validatorHandler(getAuthorSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const author: any = await service.deleteAuthor(+id)
      res.status(200).json({ data: author })
    } catch (error) {
      next(error)
    }
  }
)

export default router 
