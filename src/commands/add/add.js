let commands = {
  name: 'add',
  use: '<command> <arg>',
  desc: 'Add something to the bot to be pulled later',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    let user = await msg.guild.members.array()
    let role = await msg.guild.roles.array()
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
    if (abuse) await msg.reply('Sorry ' + suffix + ' is not allowed').catch(console.error)
    let userID = await msg.author.id
    let s = new db.SaysDB({
      auther: userID,
      say: suffix
    })
    await msg.delete().catch(console.error)
    await s.save((err, s) => {
      if (err) throw err
      msg.channel.send('I have stored ' + suffix + ' congrats').then(message => message.delete({timeout: 60000})).catch(console.error)
    })
  }
}

export {commands}
