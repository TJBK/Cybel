import { Schema } from 'mongoose'

let serverScheme = Schema({
  _id: String,
  prefix: String,
  level: Boolean,
  delete: Boolean,
  spam: Boolean
})

export { serverScheme }
