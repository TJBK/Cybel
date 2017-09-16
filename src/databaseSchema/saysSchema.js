import { Schema } from 'mongoose'

let saysSchema = Schema({
  auther: String,
  say: String
})

export { saysSchema }
