import axios from 'axios'

let commands = {
  name: 'quote',
  category: 'fun',
  use: '<command>',
  desc: 'Get random quote',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    let quote = await axios.get('http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en')
    try {
      msg.channel.send({ embed: {
        title: quote.data.quoteAuthor,
        description: quote.data.quoteText,
        url: quote.data.quoteLink,
        footer: {
          text: 'Quotes provided by forismatic.com'
        }
      }})
      msg.delete()
    } catch (err) {
      utl.error(msg, err)
    }
  }
}

export { commands }
