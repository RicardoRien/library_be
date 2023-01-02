import { Book, PrismaClient } from '@prisma/client'
import boom from '@hapi/boom'

const prisma = new PrismaClient()

class BookService {

  async find() {
    return await prisma.book.findMany({
      select: {
        id: true,
        title: true,
        datePublished: true,
        isFiction: true,
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          }
        }
      }
    })
  }

  async findById(id: number) {
    const book = await prisma.book.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        isFiction: true,
        datePublished: true,
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          }
        }
      }
    })

    if (!book) {
      throw boom.notFound('ID not found')
    }
    return book
  }

  async createBook(book: Book) {
    const { title, authorId, datePublished, isFiction } = book
    return await prisma.book.create({
      data: { title, authorId, datePublished, isFiction }
    })
  }

  async updateBook(id: number, book: Book) {
    const { title, authorId, datePublished, isFiction } = book
    const bookUpdated = await prisma.book.update({
      where: { id },
      data: { title, authorId, datePublished, isFiction },
      select: {
        title: true,
        authorId: true,
        datePublished: true,
        isFiction: true
      }
    })
    if (!bookUpdated) {
      throw boom.notFound('Book not found')
    }
    return bookUpdated
  }

  async deleteBook(id: number) {
    return await prisma.book.delete({ where: { id } })
  }
}

export default BookService 
