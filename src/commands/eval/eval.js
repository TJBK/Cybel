let commands = {
  name: 'eval',
  use: '<command> <code>',
  desc: 'Execute JS code',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    let clean = (text) => {
      if (typeof (text) === 'string') { return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203)) } else { return text }
    }
    try {
      let evaled = await eval(suffix)
      if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
      await msg.channel.send({
        embed: {
          fields: [{
            name: ':inbox_tray: Input',
            value: clean(suffix)
          },
          {
            name: ':outbox_tray: Output',
            value: clean(evaled)
          }]
        }
      }).then(message => message.delete({timeout: 120000})).catch(console.error)
      await msg.delete()
    } catch (err) {
      await msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``).then(message => message.delete({timeout: 60000})).catch(console.error)
    }
  }
}

export {commands}
