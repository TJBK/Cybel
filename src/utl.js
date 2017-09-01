import * as db from './db.js'
import {botOwner, userEval} from './config.json'

export let isAdmin = (member) => {
  if (member.id !== botOwner) return member.hasPermission('ADMINISTRATOR')
  return true
}

export let isOwner = (member) => {
  if (member.id !== botOwner) return false
  return true
}

export let isEval = (member) => {
  if (userEval.indexOf(member.id) !== -1) return true
  return false
}

export let isNSFW = (channel) => {
  return channel.nsfw
}

export let check = async (client, msg, serverDoc) => {

}

export let points = (client, userID, msg) => {
  db.LevelDB.findOne({_id: userID}, (err, result) => {
    if (err) throw err
    if (!result) {
      let userInfo = new db.LevelDB({
        _id: userID,
        points: 0,
        level: 0
      })
      userInfo.save((err, userInfo) => { if (err) throw err })
    } else {
      let addP = result.points + 1
      let curLevel = Math.floor(0.1 * Math.sqrt(addP))
      if (curLevel > result.level) {
        msg.reply('Woop Level Up ' + curLevel + '! *Insert FF level up sound* - Cn')
          .then(message => message.delete({timeout: 60000})).catch(console.error)
      }
      db.LevelDB.findOneAndUpdate({_id: userID}, {$set: {points: addP, level: curLevel}}, {new: true}, (err, newRec) => {
        if (err) throw err
      })
    }
  })
}
