let commands = {
  name: 'ping',
  use: '<command>',
  desc: 'Check Latency',
  process: async (msg, suffix, client) => {
    let lat = await new Date().getTime() - msg.createdTimestamp
    await msg.delete(100).catch(console.error)
    await msg.channel.send({
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
    }).then(message => message.delete({timeout: 60000})).catch(console.error)
  }
}

export {commands}
