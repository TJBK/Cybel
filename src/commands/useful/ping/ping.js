let commands = {
  name: 'ping',
  category: 'useful',
  use: '<command>',
  desc: 'Check Latency',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    let lat = new Date().getTime() - msg.createdTimestamp
    try {
      msg.delete()
      msg.channel.send({
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
      }).then(m => utl.deleteMsg(m))
    } catch (err) {
      utl.error(msg, err)
    }
  }
}

export { commands }
