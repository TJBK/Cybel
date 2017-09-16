import request from 'request'

let commands = {
  name: 'quote',
  category: 'fun',
  use: '<command>',
  desc: 'Get random quote',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    request({url: 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en'}, async (err, res, json) => {
      if (err) throw err
      let quote = JSON.parse(json)
      try {
        msg.delete()
        msg.channel.send({
          embed: {
            title: quote.quoteAuthor,
            description: quote.quoteText,
            url: quote.quoteLink,
            footer: {
              text: 'Quotes provided by forismatic.com'
            }
          }
        })
      } catch (err) {
        msg.channel.send('Fail' + err).then(message => message.delete({timeout: 60000}))
      }
    })
  }
}

export { commands }
