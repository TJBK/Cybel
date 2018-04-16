let commands = {
  name: 'eval',
  category: 'useful',
  use: '<command> <code>',
  desc: 'Execute JS code',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    if (!utl.isEval(msg.member)) return msg.reply('Sorry you don"t have perms for that').then(message => message.delete({timeout: 60000})).catch(console.error)
    let evaled = eval(suffix)
    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
    try {
      utl.sendMsg(msg, {
        embed: {
          fields: [{
            name: ':inbox_tray: Input',
            value: utl.clean(suffix)
          },
          {
            name: ':outbox_tray: Output',
            value: utl.clean(evaled)
          }]
        }
      })
    } catch (err) {
      utl.sendError(msg, err)
    }
  }
}

export { commands }
