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
      utl.error(msg, err)
    }
  }
}

export { commands }
