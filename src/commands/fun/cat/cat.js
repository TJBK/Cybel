import request from 'request'

let commands = {
  name: 'cat',
  category: 'fun',
  use: '<command>',
  desc: 'Get a random cat pic/vid',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    request({url: 'http://random.cat/meow'}, async (err, res, json) => {
      if (err) throw err
      let cat
      if (!err && res.statusCode === 200) cat = JSON.parse(json)
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
