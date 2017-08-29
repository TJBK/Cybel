import jsdom from 'jsdom'
import request from 'request'
import toMarkdown from 'to-markdown'

let commands = {
  name: 'efukt',
  use: '<command>',
  desc: 'Get\'s a random video from efukt',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    if (!utl.isNSFW(msg.channel)) return msg.reply('This can only be used in NSFW channels')
    let url = 'http://efukt.com/random.php'
    let msgObject = await msg.channel.send('Doing magic stuff give me a minute').catch(console.error)
    request({
      url: url,
      followRedirect: false
    }, (err, res, body) => {
      if (err) throw err
      let newUrl = res.headers.location
      jsdom.env({
        url: newUrl,
        scripts: ['https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'],
        done: async (err, window) => {
          if (err) throw err
          global.window = window
          global.$ = window.$
          global.document = window.document
          let cur = window.location.href
          let title = document.querySelector('.title').textContent
          let desc = document.querySelector('.desc').innerHTML
          let img
          if (document.querySelector('#efukt_video')) {
            img = document.querySelector('#efukt_video').getAttribute('poster')
          } else {
            img = document.querySelector('.image_content').src
          }
          try {
            msg.delete()
            msgObject.delete()
            msg.channel.send({
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
          } catch (err) {
            msgObject.edit('Fail' + err)
            msgObject.delete({timeout: 60000})
          }
        }
      })
    })
  }
}

export {commands}
