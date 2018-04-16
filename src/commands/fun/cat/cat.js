import axios from 'axios'

let commands = {
  name: 'cat',
  category: 'fun',
  use: '<command>',
  desc: 'Get a random cat pic/vid',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    let image
    try {
      image = await axios.get('https://aws.random.cat/meow')
    } catch (err) {
      utl.sendMsg(msg, 'Sometimes the API doesn\'t work check: http://random.cat/help.html')
    }
    let embed = {
      description: 'Get kittie [here](' + image.data.file + ')',
      image: {
        url: image.data.file
      }
    }
    try {
      utl.sendMsg(msg, { embed })
    } catch (err) {
      utl.sendError(msg, err)
    }
  }
}

export { commands }
