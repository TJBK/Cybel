let commands = {
  name: 'eval',
  use: '<command> <code>',
  desc: 'Execute JS code',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    let clean = text => {
      if (typeof (text) === 'string') { return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203)) } else { return text }
    }
    try {
      let evaled = eval(suffix)
      if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
      msg.channel.send(clean(evaled), { code: 'xl', split: true })
    } catch (err) {
      msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
    }
  }
}

export {commands}
