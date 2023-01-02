import { Book } from '@prisma/client'
import express from 'express'
import { validatorHandler } from '../middleware/validator.handler'
import { createBookSchema, getBookSchema } from '../schemas/book.schema'
import BookService from '../services/book.service'

const router = express.Router()
const service = new BookService

router.get('/',
  async (_req, res, next) => {
    try {
      const allBooks = await service.find()
      res.json({ data: allBooks })
    } catch (error) {
      next(error)
    }
  }
)

router.post('/',
  validatorHandler(createBookSchema),
  async (req, res, next) => {
    try {
      const body = req.body
      const newBook = await service.createBook(body)
      res.status(201).json({ data: newBook })
    } catch (error) {
      next(error)
    }
  }
)

router.get('/:id',
  validatorHandler(getBookSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const books = await service.findById(+id)
      res.json({ data: books })
    } catch (error) {
      next(error)
    }
  }
)

router.put('/:id',
  validatorHandler(getBookSchema),
  validatorHandler(createBookSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const bookUpdated: Book | any = await service.updateBook(+id, body)
      res.status(201).json({ data: bookUpdated })
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:id',
  validatorHandler(getBookSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const author: any = await service.deleteBook(+id)
      res.status(200).json({ data: author })
    } catch (error) {
      next(error)
    }
  }
)

export default router 
