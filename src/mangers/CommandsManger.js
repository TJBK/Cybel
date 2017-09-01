import * as db from './../db.js'
import * as utl from './../utl.js'

class CommandsManger {
  constructor (client) {
    this.client = client
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

  handle (msg, serverDoc) {
    let commands = this._commands
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
      msg.channel.send({
        embed: cms,
        split: true
      }).then(message => message.delete({timeout: 60000}))
    } catch (err) {
      throw err
    }
  }
}

export {CommandsManger}
