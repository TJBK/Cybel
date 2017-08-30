let commands = {
  name: 'shutdown',
  use: '<command>',
  desc: 'The bot owner to shutdown the bot',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    if (!utl.isOwner(msg.member)) return msg.reply('Sorry you don\'t have perms for that').then(message => message.delete({timeout: 60000})).catch(console.error)
    try {
      msg.channel.send('Shutting down bye bye :C')
      client.kill()
      process.exit(0)
    } catch (err) {
      msg.channel.send('Well, this is weird, I failed to shut down I guess the gods don\'t want me gone today')
    }
  }
}

export {commands}