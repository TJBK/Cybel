let commands = {
  name: 'setup',
  use: '<command> <instruction> <suffix>',
  desc: 'The is prefix that\'s all you need at the moment',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    if (!utl.isAdmin(msg.member)) return msg.reply('Sorry you don\'t have perms for that').then(message => message.delete(60000))
    let serverID = msg.guild.id
    let setupPro = suffix.split(' ')
    switch (setupPro[0]) {
      case 'level':
        db.ServerDB.update({ _id: serverID }, {$set: { level: setupPro[1] }}, (err, newLevel) => { if (err) throw err })
        break
      case 'spam':
        db.ServerDB.update({ _id: serverID }, {$set: { spam: setupPro[1] }}, (err, newSpam) => { if (err) throw err })
        break
      case 'gl':
        db.ServerDB.update({ _id: serverID }, {$set: { greeting: setupPro[1] }}, (err, newGreet) => {
          if (err) throw err
          let guild = msg.guild
          try {
            guild.createChannel('welcome-leave-log', 'text', {
              overwrites: [{
                id: serverID,
                deny: ['SEND_MESSAGES']
              }],
              reason: 'For the join and leave log'
            }).then(ch => {
              db.ServerDB.update({ _id: serverID }, {$set: { greetingChannel: ch.id }}, (err, ch) => { if (err) throw err })
            }).catch(console.error)
          } catch (err) {}
        })
        break
      case 'prefix':
        db.ServerDB.update({ _id: serverID }, {$set: { prefix: setupPro[1] }}, (err, newPrefix) => { if (err) throw err })
        break
      case 'roles':
        let msgObject
        await msg.channel.send('Starting').then(ch => msgObject = ch).catch(console.error)
        let continents = ['Asia', 'Africa', 'Antarctica', 'Australia', 'Europe', 'Kekistan', 'North America', 'South America']
        await continents.forEach(i => {
          msg.guild.createRole({
            data: {
              name: i,
              color: 'RANDOM'
            },
            reason: 'For role setup'
          })
        })
        await msg.guild.createRole({
          data: {
            name: 'New User',
            color: 'RANDOM'
          },
          reason: 'For role setup'
        })
        await msg.guild.createRole({
          data: {
            name: 'Verified',
            color: 'RANDOM'
          },
          reason: 'For role setup'
        })
        await msgObject.edit('Done roles setup')
        break
      case 'spamChannel':
        db.ServerDB.update({ _id: serverID }, {$set: { spamChannel: msg.channel.id }}, (err, newSpamC) => { if (err) throw err })
        break
    }
  }
}

export {commands}
