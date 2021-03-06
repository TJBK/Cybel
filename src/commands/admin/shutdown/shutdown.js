let commands = {
  name: 'shutdown',
  category: 'admin',
  use: '<command>',
  desc: 'The bot owner to shutdown the bot',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    if (!utl.isOwner(msg.member)) return msg.reply('Sorry you don"t have perms for that').then(message => message.delete({timeout: 60000})).catch(console.error)
    try {
      utl.sendMsg(msg, 'Shutting down bye bye :C')
      process.exit()
    } catch (err) {
      utl.sendError(msg, err)
    }
  }
}

export { commands }
