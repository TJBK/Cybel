import discord from 'discord.js'
import * as db from './db.js'
import {token} from './config.json'
import {loadCMD} from './load.js'
import * as utl from './utl.js'

let client = new discord.Client()

client.on('ready', () => {
  console.log(client.user.tag + ' has started trying to login.')
  client.user.setGame('with ' + client.users.size + ' people', {type: 'PLAYING'})
  loadCMD()
})

client.on('message', async (msg) => {
  let userID = await msg.author.id
  let serverID = await msg.guild.id
  db.ServerDB.findOne({_id: serverID}, async (err, serverDoc) => {
    if (err) throw err
    if (msg.author.id !== client.user.id && (msg.content.startsWith(serverDoc.prefix))) utl.check(client, msg, serverDoc)
    if (serverDoc.level) utl.points(client, userID, msg)
  })
  if (msg.content === 'debugadd') {
    let server = new db.ServerDB({
      _id: serverID,
      prefix: '!',
      level: false,
      spam: false,
      greeting: false,
      greetingChannel: '',
      greetingString: 'String',
      leaveString: 'String'
    })
    server.save((err, serverInfo) => { if (err) return console.error(err) })
  }
  if (msg.author.id !== client.user.id) {
    let f = msg.content.toLowerCase()
    if (f !== 'f') return
    let img = await 'https://cdn.discordapp.com/attachments/336187381952806925/344289790482579456/respect.jpg'
    await msg.channel.send({
      embed: {
        title: 'Paid Your Respects',
        image: {
          file: img
        }
      }
    }).catch(console.error)
  }
})

client.on('guildCreate', (guild) => {
  let id = guild.id
  let server = new db.ServerDB({
    _id: id,
    prefix: '!',
    level: false,
    spam: false,
    greeting: false,
    greetingChannel: '',
    greetingString: 'String',
    leaveString: 'String'
  })
  server.save((err, serverInfo) => { if (err) throw err })
})

client.on('guildMemberAdd', (member) => {
  let guild = member.guild
  let serverID = guild.id
  db.ServerDB.findOne({_id: serverID}, async (err, serverDoc) => {
    if (err) throw err
    if (!serverDoc.greeting) return
    let chID = await serverDoc.greetingChannel
    let channel = await guild.channels.get(chID)
    await channel.send('Welcome <@' + member.id + '>. Please read the <#324558902765027328> and make a <#339245304710955010> to be verified. <@&344282081670725634>.')
  })
})

client.on('guildMemberRemove', (member) => {
  let guild = member.guild
  let serverID = guild.id
  db.ServerDB.findOne({ _id: serverID }, async (err, serverDoc) => {
    if (err) throw err
    if (!serverDoc.greeting) return
    let chID = await serverDoc.greetingChannel
    let channel = await guild.channels.get(chID)
    await channel.send('Press F to pay respect for ' + member.displayName + '.')
  })
})

client.login(token)
    .then(tokenA => console.log('Logged in with ' + tokenA + ''))
    .catch(console.error)
