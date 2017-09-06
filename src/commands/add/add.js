let commands = {
  name: 'add',
  use: '<command> <arg>',
  desc: 'Add something to the bot to be pulled later',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    let abuse = false
    if (msg.mentions) abuse = true
    if (abuse) return msg.reply('Sorry ' + suffix + ' is not allowed')
    try {
      let userID = msg.author.id
      let s = new db.SaysDB({
        auther: userID,
        say: suffix
      })
      s.save((s) => {
        msg.delete()
        msg.channel.send({embed: {
          description: 'I have stored ' + suffix + ' congrats'
        }}).then(message => message.delete({timeout: 60000}))
      })
    } catch (err) {
      msg.channel.send({embed: {
        feilds: [{
          name: 'Fail',
          value: err
        }]
      }}).then(message => message.delete({timeout: 60000}))
    }
  }
}

export {commands}
