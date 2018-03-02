import setupInfo from './setupInfo'

let commands = {
  name: 'setup',
  category: 'admin',
  use: '<command>',
  desc: 'The setup command for the bot',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    if (!utl.isAdmin(msg.member)) return msg.reply('Sorry you don"t have perms for that').then(message => message.delete({timeout: 60000})).catch(console.error)
    let setupMsg = await msg.channel.send({embed: setupInfo.init})
    let collector = msg.channel.createMessageCollector(m => m.content, {max: 1})
    collector.on('collect', m => m.delete())
    collector.on('end', collected => collected.map(async x => { set(x.content) }))
    let set = (text) => {
      setupMsg.edit({embed: setupInfo[text]})
      let collector = msg.channel.createMessageCollector(m => m.content, {max: 1})
      collector.on('collect', m => m.delete())
      collector.on('end', collected => collected.map(async x => {
        let answer = x.content
        db.ServerDB.update({ _id: x.guild.id }, {$set: { [text]: answer }}, (err, update) => {
          if (err) throw err
          setupMsg.edit({embed: {title: 'Set ' + text + ' to ' + answer + ''}}).then(m => utl.deleteMsg(m))
        })
      }))
    }
  }
}

export { commands }
