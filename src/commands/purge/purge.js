let commands = {
  name: 'purge',
  use: '<command> <arg>',
  desc: 'For admins to delete many messages at once',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    if (!utl.isAdmin(msg.member)) return msg.reply('Sorry you don\'t have perms for that').then(message => message.delete({timeout: 60000})).catch(console.error)
    let deleteCount = parseInt(suffix)
    if (!deleteCount || deleteCount < 2 || deleteCount > 100) return msg.reply('Please provide a number between 2 and 100 for the number of messages to delete')
    try {
      msg.channel.messages.fetch({ limit: deleteCount }).then(messages => msg.channel.bulkDelete(messages))
    } catch (err) {
      msg.channel.send('Fail' + err).then(message => message.delete({timeout: 60000}))
    }
  }
}

export {commands}
