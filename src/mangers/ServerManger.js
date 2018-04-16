class ServerManger {
  constructor (client, db) {
    this.client = client
    this.db = db
  }

  addServer (id) {
    let db = this.db
    db.ServerDB.findOne({ _id: id }, async (err, serverDoc) => {
      if (err) throw err
      if (serverDoc) return
      let server = new db.ServerDB({
        _id: id,
        prefix: '!',
        level: false,
        delete: true,
        spam: false
      })
      server.save((err, serverInfo) => { if (err) throw err })
      this.updateStatus()
    })
  }

  userJoin (member) {
    let db = this.db
    db.ServerDB.findOne({_id: member.guild.id}, async (err, serverDoc) => {
      if (err) throw err
      if (!serverDoc.greeting) return
      let chID = serverDoc.greetingChannel
      let channel = member.guild.channels.get(chID)
      channel.send('Welcome <@' + member.id + '>. Please read the <#324558902765027328> and make a <#339245304710955010> to be verified. <@&344282081670725634>.')
      this.updateStatus()
    })
  }

  userLeave (member) {
    let db = this.db
    db.ServerDB.findOne({ _id: member.guild.id }, async (err, serverDoc) => {
      if (err) throw err
      if (!serverDoc.greeting) return
      let chID = serverDoc.greetingChannel
      let channel = member.guild.channels.get(chID)
      channel.send('Press F to pay respect for ' + member.displayName + '.')
      this.updateStatus()
    })
  }

  updateStatus () {
    this.client.user.setPresence({
      game: {
        name: 'with ' + this.client.users.size + ' people across ' + this.client.guilds.size + ' servers',
        type: 0
      }
    })
  }
}

export { ServerManger }
