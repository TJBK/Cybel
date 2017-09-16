import mongoose from 'mongoose'
import * as schemas from './databaseSchema/index'
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

let ServerDB = mongoose.model('serverdb', schemas.serverScheme)
let LevelDB = mongoose.model('leveldb', schemas.levelSchema)
let SaysDB = mongoose.model('saysdb', schemas.saysSchema)

export {startDB, ServerDB, LevelDB, SaysDB}
