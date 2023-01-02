import { PrismaClient, Author } from '@prisma/client'
import boom from '@hapi/boom'

const prisma = new PrismaClient()

class AuthorService {

  async find() {
    return await prisma.author.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true
      }
    })
  }

  async findById(id: number) {
    const authorId = await prisma.author.findUnique({
      where: { id }
    })

    if (!authorId) {
      throw boom.notFound('ID not found')
    }
    return authorId
  }

  async createAuthor(author: Author) {
    const { firstName, lastName } = author
    return await prisma.author.create({
      data: { firstName, lastName }
    })
  }

  async updateAuthor(id: number, author: Author) {
    const { firstName, lastName } = author
    const authorUpdated = await prisma.author.update({
      where: { id },
      data: { firstName, lastName },
      select: { firstName: true, lastName: true }
    })
    if (!authorUpdated) {
      throw boom.notFound('Author not found')
    }
    return authorUpdated
  }

  async deleteAuthor(id: number) {
    return await prisma.author.delete({ where: { id } })
  }
}

export default AuthorService 
