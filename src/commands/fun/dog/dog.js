import request from 'request'

let commands = {
  name: 'dog',
  category: 'fun',
  use: '<command>',
  desc: 'Get a random dog pic/vid',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    request({url: 'https://random.dog/woof.json', json: true}, async (err, res, json) => {
      if (err) throw err
      let embed = {}
      let vid = false
      if (json.url.indexOf('mp4') !== -1) vid = true
      embed = {
        description: 'Get doggie [here](' + json.url + ')',
        image: {
          url: json.url
        }
      }
      if (vid) embed.description = 'Get doggie video [here](' + json.url + ')'
      try {
        msg.delete()
        msg.channel.send({embed: embed})
      } catch (err) {
        msg.channel.send('Fail' + err).then(message => message.delete({timeout: 60000}))
      }
    })
  }
}

export { commands }
