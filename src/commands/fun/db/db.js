let commands = {
  name: 'db',
  category: 'fun',
  use: '<command>',
  desc: 'Get something from the DB',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    if (serverDoc.spamEnable === false) return
    db.SaysDB.count({}, async (err, count) => {
      if (err) throw err
      let skipCount = Math.floor(Math.random() * count)
      db.SaysDB.find({}).skip(skipCount).limit(1).exec(async (err, docs) => {
        if (err) throw err
        utl.sendMsg(msg, docs[0].say)
      })
    })
  }
}

export { commands }
