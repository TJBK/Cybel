let commands = {
  name: 'db',
  use: '<command>',
  desc: 'Get something from the DB',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    if (serverDoc.spamEnable === true) {
      db.SaysDB.count({}, (err, count) => {
        if (!err) {
          var skipCount = Math.floor(Math.random() * count)
          db.SaysDB.find({}).skip(skipCount).limit(1).exec((err2, docs) => {
            if (!err2) {
              msg.channel.send(docs[0].say)
            }
          })
        }
      })
    }
  }
}

export {commands}
