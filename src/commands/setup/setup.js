let commands = {
  name: 'setup',
  use: '<command> <instruction> <suffix>',
  desc: 'The is prefix that\'s all you need at the moment',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    if (!utl.isAdmin(msg.member)) return msg.reply('Sorry you don\'t have perms for that').then(message => message.delete({timeout: 60000})).catch(console.error)
    let setupMsg = await msg.channel.send({
      embed: {
        title: 'Setup',
        fields: [
          {
            name: 'level',
            value: 'Choose to enable the level system',
            inline: true
          },
          {
            name: 'spam',
            value: 'Choose to enable the spam system',
            inline: true
          },
          {
            name: 'gl',
            value: 'Choose to enable the greeting and leave system',
            inline: true
          },
          {
            name: 'prefix',
            value: 'Choose your prefix',
            inline: true
          },
          {
            name: 'roles',
            value: 'Setup up continents roles',
            inline: true
          },
          {
            name: 'spamChannel',
            value: 'Choose what the spam channel will be',
            inline: true
          }
        ],
        footer: {
          text: 'Type what you want to setup up'
        }
      }
    }).catch(console.error)
    let collector = msg.channel.createMessageCollector(m => m.content, {max: 1})
    collector.on('collect', m => m.delete())
    collector.on('end', collected => collected.map(async x => {
      let setupText = x.content
      let serverID = x.guild.id
      switch (setupText) {
        case 'level':
          setupMsg.edit({
            embed: {
              title: 'Options',
              fields: [
                {
                  name: 'true',
                  value: 'Enable level system',
                  inline: false
                },
                {
                  name: 'false',
                  value: 'Disable level system',
                  inline: false
                }
              ],
              footer: {
                text: 'Type true or false'
              }
            }
          }).catch(console.error)
          let LevelCollector = msg.channel.createMessageCollector(m => m.content, {max: 1})
          LevelCollector.on('collect', m => m.delete())
          LevelCollector.on('end', collected => collected.map(x => {
            db.ServerDB.update({ _id: serverID }, {$set: { level: x.content }}, (err, newLevel) => {
              if (err) throw err
              setupMsg.edit({embed: {title: 'Done'}}).then(message => message.delete({timeout: 120000})).catch(console.error)
              console.log(newLevel)
            })
          }))
          break
        case 'spam':
          setupMsg.edit({
            embed: {
              title: 'Options',
              fields: [
                {
                  name: 'true',
                  value: 'Enable spam system',
                  inline: false
                },
                {
                  name: 'false',
                  value: 'Disable spam system',
                  inline: false
                }
              ],
              footer: {
                text: 'Type true or false'
              }
            }
          }).catch(console.error)
          let spamCollector = msg.channel.createMessageCollector(m => m.content, {max: 1})
          spamCollector.on('collect', m => m.delete())
          spamCollector.on('end', collected => collected.map(x => {
            db.ServerDB.update({ _id: serverID }, {$set: { spam: x.content }}, (err, newSpam) => {
              if (err) throw err
              setupMsg.edit({embed: {title: 'Done'}}).then(message => message.delete({timeout: 120000})).catch(console.error)
            })
          }))
          break
        case 'gl':
          setupMsg.edit({
            embed: {
              title: 'Options',
              fields: [
                {
                  name: 'true',
                  value: 'Enable greeting and leave system',
                  inline: false
                },
                {
                  name: 'false',
                  value: 'Disable greeting and leave system',
                  inline: false
                }
              ],
              footer: {
                text: 'Type true or false'
              }
            }
          }).catch(console.error)
          let glCollector = msg.channel.createMessageCollector(m => m.content, {max: 1})
          glCollector.on('collect', m => m.delete())
          glCollector.on('end', collected => collected.map(x => {
            db.ServerDB.update({ _id: serverID }, {$set: { greeting: x.content }}, (err, newGreet) => {
              if (err) throw err
              let guild = msg.guild
              if (x.content !== 'true') return setupMsg.edit({embed: {title: 'Done'}}).then(message => message.delete({timeout: 120000})).catch(console.error)
              try {
                setupMsg.edit({embed: {title: 'Done'}}).then(message => message.delete({timeout: 120000})).catch(console.error)
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
          }))
          break
        case 'prefix':
          setupMsg.edit({
            embed: {
              title: 'Options',
              description: 'Type the prefix you want'
            }
          }).catch(console.error)
          let prefixCollector = msg.channel.createMessageCollector(m => m.content, {max: 1})
          prefixCollector.on('collect', m => m.delete())
          prefixCollector.on('end', collected => collected.map(x => {
            db.ServerDB.update({ _id: serverID }, {$set: { prefix: x.content }}, (err, newPrefix) => {
              if (err) throw err
              setupMsg.edit({embed: {title: 'Done'}}).then(message => message.delete({timeout: 120000})).catch(console.error)
            })
          }))
          break
        case 'roles':
          let msgObject = await msg.channel.send('Starting').catch(console.error)
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
          await msgObject.edit('Done roles setup').then(message => message.delete({timeout: 12000})).catch(console.error)
          setupMsg.edit({embed: {title: 'Done'}}).then(message => message.delete({timeout: 120000})).catch(console.error)
          break
        case 'spamChannel':
          db.ServerDB.update({ _id: serverID }, {$set: { spamChannel: msg.channel.id }}, (err, newSpamC) => {
            if (err) throw err
            setupMsg.edit({embed: {title: 'Done'}}).then(message => message.delete({timeout: 120000})).catch(console.error)
          })
          break
        default:
          setupMsg.edit({embed: {title: 'Check your spelling'}}).then(message => message.delete({timeout: 120000})).catch(console.error)
      }
      msg.delete().catch(console.error)
    }))
  }
}

export {commands}
