let commands = {
  name: 'level',
  category: 'useful',
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
          utl.sendMsg(msg, 'You did not have a entry in the DB')
        }
        utl.sendMsg(msg, 'You"re **level ' + result.level + '**')
      })
    } catch (err) {
      utl.sendError(msg, err)
    }
  }
}

export { commands }
