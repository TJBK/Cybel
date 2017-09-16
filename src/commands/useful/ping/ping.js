let commands = {
  name: 'ping',
  category: 'useful',
  use: '<command>',
  desc: 'Check Latency',
  process: async (msg, suffix, client) => {
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
      }).then(message => message.delete({timeout: 60000}))
    } catch (err) {
      msg.channel.send('Fail' + err).then(message => message.delete({timeout: 60000}))
    }
  }
}

export { commands }
