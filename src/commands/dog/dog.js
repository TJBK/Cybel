import request from 'request'

let commands = {
  name: 'dog',
  use: '<command>',
  desc: 'Get a random dog pic/vid',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    request({url: 'https://random.dog/woof.json', json: true}, async (err, res, json) => {
      if (err) throw err
      let dog
      if (!err && res.statusCode === 200) {
        dog = JSON.parse(json)
      }
      let embed = {}
      let vid = false
      if (dog.url.indexOf('mp4') !== -1) vid = true
      embed = {
        description: 'Get doggie [here](' + dog.url + ')',
        image: {
          url: dog.url
        }
      }
      if (vid) embed.description = 'Get doggie video [here](' + dog.url + ')'
      try {
        msg.delete()
        msg.channel.send({embed: embed})
      } catch (err) {
        msg.channel.send('Fail' + err).then(message => message.delete({timeout: 60000}))
      }
    })
  }
}

export {commands}
