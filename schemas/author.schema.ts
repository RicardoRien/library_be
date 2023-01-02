import { z } from "zod"

const id = z.number()
const name = z.string()
const email = z.string().email({ message: 'Write a correct email' })
const role = z.string()

export const getAuthorSchema = z.object({
  params: z.object({
    id: id.min(1),
  })
})

export const createUserSchema = z.object({
  body: z.object({
    firstName: name.min(4, 'First name is too short'),
    lastName: name.min(4, 'Last name is too short'),
  })
})

export const updateUserSchema = z.object({
  params: z.object({
    id: id.min(1),
  }),
  body: z.object({
    email: email.min(8),
    role: role.min(1) 
  })
})
