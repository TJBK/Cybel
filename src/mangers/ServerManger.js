class ServerManger {
  constructor (client, db) {
    this.client = client
    this.db = db
  }

  add (id) {
    let db = this._db
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
    this.updateStatus()
  }

  delete (id) {
    let db = this._db
    db.remove({_id: id}, (err) => { if (err) throw err })
    this.updateStatus()
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

export {ServerManger}
