let commands = {
  name: 'add',
  use: '<command> <arg>',
  desc: 'Add something to the bot to be pulled later',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    let user = msg.guild.members.array()
    let role = msg.guild.roles.array()
    let abuse = false
    if (suffix === '@everyone' || suffix === '@here') {
      abuse = await true
    }
    for (let i in user) {
      let users = user[i]
      if (suffix.includes(users)) abuse = await true; break
    }
    for (let i in role) {
      let roles = role[i]
      if (suffix.includes(roles)) abuse = await true; break
    }
    if (abuse) msg.reply('Sorry ' + suffix + ' is not allowed')
    try {
      let userID = msg.author.id
      let s = new db.SaysDB({
        auther: userID,
        say: suffix
      })
      s.save((s) => {
        msg.delete()
        msg.channel.send('I have stored ' + suffix + ' congrats').then(message => message.delete({timeout: 60000}))
      })
    } catch (err) {
      msg.channel.send('Fail' + err).then(message => message.delete({timeout: 60000}))
    }
  }
}

export {commands}
