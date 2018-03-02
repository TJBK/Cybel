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
    client.commands = this._commands
  }

  checkMessage (msg) {
    let userID = msg.author.id
    let serverID = msg.guild.id
    let client = this.client
    let db = this.db
    if (msg.author.id === client.user.id) return
    db.ServerDB.findOne({_id: serverID}, async (err, serverDoc) => {
      if (err) throw err
      if (!serverDoc) client.mangers.server.addServer(serverID)
      if (msg.content.startsWith(serverDoc.prefix)) this.handle(msg, serverDoc)
      if (serverDoc.level) client.mangers.level.checkUser(msg, userID)
    })
  }

  handle (msg, serverDoc) {
    let commands = this._commands
    let db = this.db
    let cmdtext = msg.content.split(' ')[0].substring(serverDoc.prefix.length).toLowerCase()
    let suffix = msg.content.substring(cmdtext.length + serverDoc.prefix.length + 1)
    let cmd = commands.find(x => x.name === cmdtext)
    try {
      cmd.process(msg, suffix, this.client, serverDoc, db, this.client.mangers.utl)
    } catch (err) {}
  }
}

export { CommandsManger }
