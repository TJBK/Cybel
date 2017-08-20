let commands = {
  name: 'level',
  use: '<command>',
  desc: 'Check what your level is',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    let userID = await msg.author.id
    await db.LevelDB.findOne({ _id: userID }, (err, result) => {
      if (err) return console.error(err)
      if (!result) {
        let userInfo = new db.LevelDB({
          _id: userID,
          points: 0,
          level: 0
        })
        userInfo.save((err, userInfo) => {
          if (err) return console.error(err)
        })
        msg.reply('You did not have a entry in the DB')
      }
      msg.reply('You\'re **level ' + result.level + '**')
    })
  }
}

export {commands}
