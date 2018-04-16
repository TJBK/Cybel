let commands = {
  name: 'ping',
  category: 'useful',
  use: '<command>',
  desc: 'Check Latency',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    let lat = new Date().getTime() - msg.createdTimestamp
    try {
      utl.sendMsg(msg, {
        embed: {
          fields: [{
            name: 'Bot Latency',
            value: ':timer: ' + lat + 'ms',
            inline: true
          },
          {
            name: 'API Latency',
            value: ':sparkling_heart: ' + Math.round(client.ping) + 'ms',
            inline: true
          }],
          timestamp: new Date()
        }
      })
    } catch (err) {
      utl.sendError(msg, err)
    }
  }
}

export { commands }
