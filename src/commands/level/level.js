let commands = {
  name: 'level',
  use: '<command>',
  desc: 'Check what your level is',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    try {
      let userID = msg.author.id
      db.LevelDB.findOne({ _id: userID }, async (err, result) => {
        if (err) throw err
        if (result === null) {
          let userInfo = new db.LevelDB({
            _id: userID,
            points: 0,
            level: 0
          })
          userInfo.save((userInfo) => {})
          msg.delete()
          msg.reply('You did not have a entry in the DB').then(message => message.delete({timeout: 60000}))
        }
        msg.delete()
        msg.reply('You\'re **level ' + result.level + '**').then(message => message.delete({timeout: 60000}))
      })
    } catch (err) {
      msg.channel.send('Fail' + err).then(message => message.delete({timeout: 60000}))
    }
  }
}

export {commands}
