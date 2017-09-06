import mongoose from 'mongoose'
import {green} from 'chalk'

let startDB = (dbName) => {
  try {
    let mongodbURL = 'mongodb://127.0.0.1:27017/' + dbName
    mongoose.connection.openUri(mongodbURL)
  } catch (err) {
    throw err
  }
}

let db = mongoose.connection
db.on('error', console.info.bind(console, 'connection error:'))
db.once('open', () => console.log('DB ' + green('connected')))

let levelSchema = mongoose.Schema({
  _id: String,
  points: Number,
  level: Number
})

let serverScheme = mongoose.Schema({
  _id: String,
  prefix: String,
  level: Boolean,
  spam: Boolean,
  greeting: Boolean,
  greetingChannel: String,
  greetingString: String,
  leaveString: String
})

let saysSchema = mongoose.Schema({
  auther: String,
  say: String
})

let ServerDB = mongoose.model('serverdb', serverScheme)
let LevelDB = mongoose.model('leveldb', levelSchema)
let SaysDB = mongoose.model('saysdb', saysSchema)

export {startDB, ServerDB, LevelDB, SaysDB}
