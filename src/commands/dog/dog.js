import request from 'request'

let commands = {
  name: 'dog',
  use: '<command>',
  desc: 'Get a random dog pic/vid',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    await request({url: 'https://random.dog/woof.json', json: true}, async (err, res, json) => {
      if (err) console.error(err)
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
      await msg.delete()
      await msg.channel.send({embed: embed})
    })
  }
}

export {commands}
