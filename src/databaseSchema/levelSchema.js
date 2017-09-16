import { Schema } from 'mongoose'

let levelSchema = Schema({
  _id: String,
  points: Number,
  level: Number
})

export { levelSchema }
