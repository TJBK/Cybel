import request from 'request'
import toMarkdown from 'to-markdown'

let commands = {
  name: 'quote',
  use: '<command>',
  desc: 'Get random quote',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    request({url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1'}, async (err, res, json) => {
      if (err) throw err
      let quote = JSON.parse(json)
      try {
        msg.delete()
        msg.channel.send({
          embed: {
            title: quote[0].title,
            description: toMarkdown(quote[0].content),
            url: quote[0].link
          }
        })
      } catch (err) {
        msg.channel.send('Fail' + err).then(message => message.delete({timeout: 60000}))
      }
    })
  }
}

export {commands}
