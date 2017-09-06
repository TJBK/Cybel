class LevelManger {
  constructor (client, db) {
    this._client = client
    this._db = db
  }

  addNewUser (userID) {
    let db = this._db
    let userInfo = new db.LevelDB({
      _id: userID,
      points: 0,
      level: 0
    })
    userInfo.save((err, userInfo) => { if (err) throw err })
  }

  checkUser (msg, userID) {
    let db = this._db
    db.LevelDB.findOne({_id: userID}, (err, points) => {
      if (err) throw err
      console.log(points)
      if (!points) this.addNewUser(userID)
      if (points) this.add(msg, userID)
    })
  }

  add (msg, userID) {
    let db = this._db
    db.LevelDB.findOne({_id: userID}, (err, points) => {
      if (err) throw err
      let addP = points.points + 1
      let curLevel = Math.floor(0.1 * Math.sqrt(addP))
      console.log(addP, curLevel, points.level)
      if (curLevel > points.level) {
        msg.reply('Woop Level Up ' + curLevel + '! *Insert FF level up sound* - Cn')
            .then(message => message.delete({timeout: 60000})).catch(console.error)
      }
      db.LevelDB.findOneAndUpdate({_id: userID}, {$set: {points: addP, level: curLevel}}, {new: true}, (err, newRec) => {
        if (err) throw err
      })
    })
  }
}

export {LevelManger}
