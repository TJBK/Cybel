import {commands} from './load.js'
import * as db from './db.js'
import * as utl from './utl.js'

export let isAdmin = (member) => {
  return member.hasPermission('ADMINISTRATOR')
}

export let isNSFW = (channel) => {
  return channel.nsfw
}

export let check = async(client, msg, serverDoc) => {
  let cmdtext = await msg.content.split(' ')[0].substring(serverDoc.prefix.length).toLowerCase()
  let suffix = await msg.content.substring(cmdtext.length + serverDoc.prefix.length + 1)
  let cmd = await commands.find(x => x.name === cmdtext)
  if (cmdtext === 'help') {
    let cms = await {
      title: 'Commands',
      description: 'Hey ' + msg.author.username + ', Commands on this server starts with **' + serverDoc.prefix + '**'
    }
    cms.fields = []
    for (let i in commands) {
      let cmi = await {
        name: '' + commands[i].name + ' ' + commands[i].use + '',
        value: commands[i].desc
      }
      await cms.fields.push(cmi)
    }
    try {
      await msg.channel.send({
        embed: cms,
        split: true
      })
    } catch (err) { throw err }
  } else {
    try {
      await cmd.process(msg, suffix, client, serverDoc, db, utl)
    } catch (err) {};
  }
}

export let points = (client, userID, msg) => {
  db.LevelDB.findOne({_id: userID}, function (err, result) {
    if (err) console.log(err)
    if (!result) {
      let userInfo = new db.LevelDB({
        _id: userID,
        points: 0,
        level: 0
      })
      userInfo.save(function (err, userInfo) {
        if (err) throw err
      })
    } else {
      let addP = result.points + 1
      let curLevel = Math.floor(0.1 * Math.sqrt(addP))
      if (curLevel > result.level) {
        msg.reply('Woop Level Up ' + curLevel + '! *Insert FF level up sound* - Cn').catch(console.error)
      }
      db.LevelDB.findOneAndUpdate({_id: userID}, {$set: {points: addP, level: curLevel}}, {new: true}, (err, newRec) => {
        if (err) throw err
      })
    }
  })
}
