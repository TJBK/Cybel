import request from 'request'

let commands = {
  name: 'cat',
  use: '<command>',
  desc: 'Get a random cat pic/vid',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    await request({url: 'http://random.cat/meow'}, async (err, res, json) => {
      if (err) throw err
      let cat
      if (!err && res.statusCode === 200) {
        cat = await JSON.parse(json)
      }
      let embed = {}
      let vid = false
      if (cat.file.indexOf('mp4') !== -1) vid = true
      embed = {
        description: 'Get kittie [here](' + cat.file + ')',
        image: {
          url: cat.file
        }
      }
      if (vid) embed.description = 'Get kittie video [here](' + cat.file + ')'
      await msg.delete().catch(console.error)
      await msg.channel.send({embed: embed}).catch(console.error)
    })
  }
}

export {commands}
