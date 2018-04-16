let commands = {
  name: 'avatar',
  category: 'useful',
  use: '<command> <user>',
  desc: 'Get a users avatar',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    let mention = msg.mentions.users.first()
    let av = mention.avatarURL({
      size: 2048
    })
    try {
      utl.sendMsg(msg, {
        embed: {
          description: 'Download avatar for ' + mention.username + ' [here](' + av + ')',
          image: {
            url: av
          }
        }
      })
    } catch (err) {
      utl.sendError(msg, err)
    }
  }
}

export { commands }
