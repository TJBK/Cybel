let commands = {
  name: 'avatar',
  use: '<command> <user>',
  desc: 'Get a users avatar',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    try {
      let mention = await msg.mentions.users.first()
      let av = await mention.avatarURL({
        format: 'png',
        size: 2048
      })
      await msg.delete()
      await msg.channel.send({
        embed: {
          description: 'Download avatar for ' + mention.username + ' [here](' + av + ')',
          image: {
            url: av
          }
        }
      })
    } catch (err) {
      await msg.channel.send('Fail', err).then(message => message.delete({timeout: 60000})).catch(console.error)
    }
  }
}

export {commands}
