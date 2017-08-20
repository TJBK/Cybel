let commands = {
  name: 'purge',
  use: '<command> <arg>',
  desc: 'For admins to delete many messages at once',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    if (!utl.isAdmin(msg.member)) return msg.reply('Sorry you don\'t have perms for that').delete(3000)
    let deleteCount = await parseInt(suffix)
    if (!deleteCount || deleteCount < 2 || deleteCount > 100) return msg.reply('Please provide a number between 2 and 100 for the number of messages to delete')
    await msg.channel.fetchMessages({ limit: deleteCount }).then(messages => msg.channel.bulkDelete(messages))
  }
}

export {commands}
