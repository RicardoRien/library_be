import express from 'express'
import authorRouter from './author.router';
import bookRouter from './book.router';

function routerApi (app: express.Application): void {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/authors', authorRouter)
  router.use('/books', bookRouter)
} 

export default routerApi
