import * as utl from './../utl.js'

class CommandsManger {
  constructor (client, db) {
    this.client = client
    this.db = db
    this._commands = []
  }

  load () {
    this._commands = []
    let client = this.client
    let cmds = client.mangers.dimport.getImport('commands')
    Object.keys(cmds).forEach(file => {
      let commands = cmds[file]
      this._commands.push(commands)
    })
  }

  checkMessage (msg) {
    let userID = msg.author.id
    let serverID = msg.guild.id
    let client = this.client
    let db = this.db
    db.ServerDB.findOne({_id: serverID}, async (err, serverDoc) => {
      if (err) throw err
      if (msg.author.id !== client.user.id && (msg.content.startsWith(serverDoc.prefix))) this.handle(msg, serverDoc)
      if (serverDoc.level) client.mangers.level.checkUser(msg, userID)
    })
    if (msg.author.id === client.user.id) return
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

  handle (msg, serverDoc) {
    let commands = this._commands
    let db = this.db
    let cmdtext = msg.content.split(' ')[0].substring(serverDoc.prefix.length).toLowerCase()
    let suffix = msg.content.substring(cmdtext.length + serverDoc.prefix.length + 1)
    let cmd = commands.find(x => x.name === cmdtext)
    if (cmdtext === 'help') this.help(msg, commands, serverDoc)
    try {
      cmd.process(msg, suffix, this.client, serverDoc, db, utl)
    } catch (err) { };
  }

  help (msg, commands, serverDoc) {
    let cms = {title: 'Commands List'}
    cms.fields = []
    for (let i in commands) {
      let cmi = {
        name: '' + serverDoc.prefix + '' + commands[i].name + ' ' + commands[i].use + '',
        value: commands[i].desc
      }
      cms.fields.push(cmi)
    }
    try {
      msg.delete()
      msg.channel.send({embed: cms, split: true}).then(message => message.delete({timeout: 60000}))
    } catch (err) {
      throw err
    }
  }
}

export {CommandsManger}
