import request from 'request'

let commands = {
  name: 'dog',
  use: '<command>',
  desc: 'Get a random dog pic/vid',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    await request({url: 'https://random.dog/woof.json', json: true}, async (err, res, json) => {
      if (err) throw err
      let dog
      if (!err && res.statusCode === 200) {
        dog = await JSON.parse(json)
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
      await msg.delete().catch(console.error)
      await msg.channel.send({embed: embed}).catch(console.error)
    })
  }
}

export {commands}
