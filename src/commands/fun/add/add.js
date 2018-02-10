let commands = {
  name: 'add',
  category: 'fun',
  use: '<command> <arg>',
  desc: 'Add something to the bot to be pulled later',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    if (/[^<>@]/g.test(msg.content)) return msg.reply('Sorry ' + suffix + ' is not allowed')
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
      utl.error(msg, err)
    }
  }
}

export { commands }
