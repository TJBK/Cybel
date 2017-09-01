import discord from 'discord.js'
import {token} from './config.json'
import * as db from './db.js'
import * as Mangers from './mangers'
import {green} from 'chalk'

let client = global.client = exports.client = new discord.Client()

client.mangers = {}
client.mangers.dimport = new Mangers.DImports(client, __dirname)
client.mangers.dashboard = new Mangers.DashboardManger(client)
client.mangers.commands = new Mangers.CommandsManger(client)
client.mangers.level = new Mangers.LevelManger(client, db)
client.mangers.server = new Mangers.ServerManger(client, db)

client.on('ready', () => {
  client.user.setPresence({
    game: {
      name: 'with ' + client.users.size + ' people across ' + client.guilds.size + ' servers',
      type: 0
    }
  })
  client.mangers.dashboard.userInfo()
  client.mangers.commands.load()
})

client.on('message', (msg) => client.mangers.commands.checkMessage(msg))

client.on('guildCreate', (guild) => client.mangers.server.addServer(guild.id))

client.on('guildRemove', (guild) => client.mangers.server.deleteServer(guild.id))

client.on('guildMemberAdd', (member) => client.mangers.server.userJoin(member))

client.on('guildMemberRemove', (member) => client.mangers.server.userLeave(member))

client.on('warn', console.warn)
client.on('error', console.error)

client.login(token)
    .then(tokenA => console.log('Logged in with ' + green.bold(tokenA) + ''))
    .catch(console.error)

process.on('unhandledRejection', console.error)
process.on('exit', () => client.destroy())
