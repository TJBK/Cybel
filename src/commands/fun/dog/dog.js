import axios from 'axios'

let commands = {
  name: 'dog',
  category: 'fun',
  use: '<command>',
  desc: 'Get a random dog pic/vid',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    let image = await axios.get('https://random.dog/woof.json')
    let embed
    embed = {
      description: 'Get doggie [here](' + image.data.url + ')',
      image: {
        url: image.data.url
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
