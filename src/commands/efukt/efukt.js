import jsdom from 'jsdom'
import request from 'request'
import toMarkdown from 'to-markdown'

let commands = {
  name: 'efukt',
  use: '<command>',
  desc: 'Get\'s a random video from efukt',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    if (!utl.isNSFW(msg.channel)) return msg.reply('This can only be used in NSFW channels')
    let url = await 'http://efukt.com/random.php'
    let msgObject
    await msg.channel.send('Doing magic stuff give me a minute').then(ch => msgObject = ch).catch(console.error)
    await request({
      url: url,
      followRedirect: false
    }, (err, res, body) => {
      if (err) return console.error(err)
      let newUrl = res.headers.location
      jsdom.env({
        url: newUrl,
        scripts: ['https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'],
        done: async (err, window) => {
          if (err) return console.error(err)
          global.window = await window
          global.$ = await window.$
          global.document = await window.document
          let cur = await window.location.href
          let title = await document.querySelector('.title').textContent
          let desc = await document.querySelector('.desc').innerHTML
          let img
          if (document.querySelector('#efukt_video')) {
            img = await document.querySelector('#efukt_video').getAttribute('poster')
          } else {
            img = await document.querySelector('.image_content').src
          }
          try {
            await msg.delete()
            msgObject.delete()
            await msg.channel.send({
              embed: {
                title: title,
                description: toMarkdown(desc),
                url: cur,
                image: {
                  url: img,
                  width: 250,
                  height: 250
                }
              }
            })
          } catch (err) {}
        }
      })
    })
  }
}

export {commands}
