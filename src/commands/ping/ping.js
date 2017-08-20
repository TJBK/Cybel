let commands = {
  name: 'ping',
  use: '<command>',
  desc: 'Check Latency',
  process: async (msg, suffix, client) => {
    let lat = await new Date().getTime() - msg.createdTimestamp
    await msg.delete().catch(err => console.log(err))
    await msg.channel.send({
      embed: {
        fields: [{
          name: 'Bot Latency',
          value: ':timer: ' + lat + 'ms'
        },
        {
          name: 'API Latency',
          value: ':sparkling_heart: ' + Math.round(client.ping) + 'ms'
        }],
        timestamp: new Date()
      }
    })
  }
}

export {commands}
