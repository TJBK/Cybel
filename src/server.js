import discord from 'discord.js'
import * as db from './db.js'
import {token} from './config.json'
import * as utl from './utl.js'
import * as Mangers from './mangers'

let client = global.client = exports.client = new discord.Client()

client.mangers = {}

client.mangers.dimport = new Mangers.DImports(client, __dirname)
client.mangers.dimport.init()

client.mangers.commands = new Mangers.CommandsManger(client)

client.on('ready', () => {
  console.log(`- User: ${client.user.username}#${client.user.discriminator} <ID: ${client.user.id}>
- Users: ${client.users.size}
- Channels: ${client.channels.size}
- Guilds: ${client.guilds.size}`)
  client.user.setPresence({
    game: {
      name: 'with ' + client.users.size + ' people across ' + client.guilds.size + ' servers',
      type: 0
    }
  })
  client.mangers.commands.load()
})

client.on('message', async (msg) => {
  let userID = msg.author.id
  let serverID = msg.guild.id
  db.ServerDB.findOne({_id: serverID}, async (err, serverDoc) => {
    if (err) throw err
    if (msg.author.id !== client.user.id && (msg.content.startsWith(serverDoc.prefix))) client.mangers.commands.handle(msg, serverDoc)
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
    server.save((err, serverInfo) => { if (err) throw err })
  }
  if (msg.author.id !== client.user.id) {
    let f = msg.content.toLowerCase()
    if (f !== 'f') return
    // let img = require('path').join(__dirname) + '/img/respect.jpg'
    let img = 'https://my.mixtape.moe/rohrdz.jpg'
    msg.channel.send({
      embed: {
        title: 'Paid Your Respects',
        image: {
          url: img
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
  client.user.setPresence({
    game: {
      name: 'with ' + client.users.size + ' people across ' + client.guilds.size + ' servers',
      type: 0
    }
  })
})

client.on('guildRemove', (guild) => {
  client.user.setPresence({
    game: {
      name: 'with ' + client.users.size + ' people across ' + client.guilds.size + ' servers',
      type: 0
    }
  })
})

client.on('guildMemberAdd', (member) => {
  let guild = member.guild
  let serverID = guild.id
  db.ServerDB.findOne({_id: serverID}, async (err, serverDoc) => {
    if (err) throw err
    if (!serverDoc.greeting) return
    let chID = serverDoc.greetingChannel
    let channel = guild.channels.get(chID)
    channel.send('Welcome <@' + member.id + '>. Please read the <#324558902765027328> and make a <#339245304710955010> to be verified. <@&344282081670725634>.')
  })
})

client.on('guildMemberRemove', (member) => {
  let guild = member.guild
  let serverID = guild.id
  db.ServerDB.findOne({ _id: serverID }, async (err, serverDoc) => {
    if (err) throw err
    if (!serverDoc.greeting) return
    let chID = serverDoc.greetingChannel
    let channel = guild.channels.get(chID)
    channel.send('Press F to pay respect for ' + member.displayName + '.')
  })
})

client.login(token)
    .then(tokenA => console.log('Logged in with ' + tokenA + ''))
    .catch(console.error)

process.on('unhandledRejection', console.error)
process.on('exit', () => client.destroy())
