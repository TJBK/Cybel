import { Schema } from 'mongoose'

let serverScheme = Schema({
  _id: String,
  prefix: String,
  level: Boolean,
  spam: Boolean,
  greeting: Boolean,
  greetingChannel: String,
  greetingString: String,
  leaveString: String
})

export { serverScheme }
