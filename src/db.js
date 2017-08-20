import mongoose from 'mongoose'
import {dbName} from './config'

let mongodbURL = 'mongodb://127.0.0.1:27017/' + dbName

let options = {
  server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
}

try {
  mongoose.connect(mongodbURL, options)
} catch (err) {
  console.log(err)
  process.exit(1)
}

let db = mongoose.connection
db.on('error', console.info.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('DB connected')
})

const levelSchema = mongoose.Schema({
  _id: Number,
  points: Number,
  level: Number
})

const serverScheme = mongoose.Schema({
  _id: String,
  prefix: String,
  level: Boolean,
  spam: Boolean,
  greeting: Boolean,
  greetingChannel: String,
  greetingString: String,
  leaveString: String
})

const saysSchema = mongoose.Schema({
  auther: Number,
  say: String
})

let ServerDB = mongoose.model('serverdb', serverScheme)
let LevelDB = mongoose.model('leveldb', levelSchema)
let SaysDB = mongoose.model('saysdb', saysSchema)

export {ServerDB, LevelDB, SaysDB}
