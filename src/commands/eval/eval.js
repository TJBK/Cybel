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
      await msg.channel.send(clean(evaled), { code: 'xl', split: true })
      await msg.delete()
    } catch (err) {
      await msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
    }
  }
}

export {commands}
