let commands = {
  name: 'help',
  category: 'useful',
  use: '<command> <category>',
  desc: 'Get a list of all commands.',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    let collector = msg.channel.createMessageCollector(m => m.content, {max: 1})
    collector.on('collect', m => m.delete())
    collector.on('end', collected => collected.map(async x => {
      let m = x.content
      Embed(client.commands.filter(x => x.category === m.toLowerCase()))
      msg.delete().catch(console.error)
    }))
    let Embed = (cmds) => {
      let cms = {title: 'Help'}
      cms.fields = []
      for (let i in cmds) {
        let cmi = {
          name: '' + serverDoc.prefix + '' + cmds[i].name + ' | ' + cmds[i].use + '',
          value: cmds[i].desc
        }
        cms.fields.push(cmi)
      }
      try {
        msg.channel.send({ embed: cms, split: true }).then(message => message.delete({ timeout: 60000 }))
      } catch (err) {
        throw err
      }
    }
    let embed = {
      title: 'Help',
      description: 'Just type one of these: admin, fun, useful'
    }
    try {
      msg.channel.send({ embed: embed }).then(message => message.delete({ timeout: 60000 }))
    } catch (err) {
      utl.error(msg, err)
    }
  }
}

export { commands }
