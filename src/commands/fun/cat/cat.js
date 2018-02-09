import axios from 'axios'

let commands = {
  name: 'cat',
  category: 'fun',
  use: '<command>',
  desc: 'Get a random cat pic/vid',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    let image = await axios.get('http://random.cat/meow')
    let embed
    embed = {
      description: 'Get kittie [here](' + image.data.file + ')',
      image: {
        url: image.data.file
      }
    }
    try {
      msg.delete()
      msg.channel.send({embed: embed})
    } catch (err) {
      msg.channel.send('Fail' + err).then(message => message.delete({timeout: 60000}))
    }
  }
}

export { commands }
