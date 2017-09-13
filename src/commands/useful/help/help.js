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
      try {
        msg.delete()
        msg.channel.send({embed: {
          title: 'You want help now?',
          description: 'Pick one of these fun, useful and admin'
        }}).then(message => message.delete({timeout: 60000}))
      } catch (err) {
        throw err
      }
    }

    if (suffix) Embed(client.commands.filter(x => x.category === suffix.toLowerCase()))
    if (!suffix) noSuf()
  }
}

export {commands}
