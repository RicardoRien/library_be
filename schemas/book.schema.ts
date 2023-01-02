import { z } from "zod"

const id = z.number().nonnegative().int()
const title = z.string()
const isFiction = z.boolean()
const datePublished = z.preprocess((arg) => {
  if (typeof arg == "string" || arg instanceof Date) {
    return new Date(arg)
  } else {
    return console.error('error date')
  }
}, z.date({
  required_error: "Please select a date and time",
  invalid_type_error: "That's not a date!"
}).max(new Date(), { message: "Too young!" }))


export const getBookSchema = z.object({
  params: z.object({
    id: id.min(1),
  })
})

export const createBookSchema = z.object({
  body: z.object({
    title: title.min(4, 'Title is too short'),
    authorId: id.min(1),
    datePublished: datePublished,
    isFiction: isFiction
  })
})
