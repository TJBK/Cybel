let commands = {
  name: 'help',
  category: 'useful',
  use: '<command> <category>',
  desc: 'Get a list of all commands.',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    let Embed = (cmds) => {
      let cms = {title: 'Commands for the category ' + suffix}
      cms.fields = []
      for (let i in cmds) {
        let cmi = {
          name: '' + serverDoc.prefix + '' + cmds[i].name + ' ' + cmds[i].use + '',
          value: cmds[i].desc
        }
        cms.fields.push(cmi)
      }
      try {
        msg.delete()
        msg.channel.send({embed: cms, split: true}).then(message => message.delete({timeout: 60000}))
      } catch (err) {
        throw err
      }
    }

    let noSuf = () => {
      let cmds = ['admin', 'fun', 'useful']
      let embed = {
        title: 'You want help do you now?',
        description: 'Well then pick a category, !help <category>'
      }
      embed.fields = []
      for (let i in cmds) {
        let cmi = {
          name: cmds[i],
          value: '\u200B',
          inline: true
        }
        embed.fields.push(cmi)
      }

      try {
        msg.delete()
        msg.channel.send({embed: embed}).then(message => message.delete({timeout: 60000}))
      } catch (err) {
        throw err
      }
    }

    if (suffix) Embed(client.commands.filter(x => x.category === suffix.toLowerCase()))
    if (!suffix) noSuf()
  }
}

export { commands }
