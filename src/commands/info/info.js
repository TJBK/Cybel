let commands = {
  name: 'info',
  use: '<command>',
  desc: 'provides info about the bot',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    await msg.channel.send({
      embed: {
        title: 'Info',
        description: 'The help command for this server is ' + serverDoc.prefix + 'help',
        fields: [{
          name: 'Auther',
          value: 'TJBK#6368',
          inline: true
        },
        {
          name: 'NodeJS version',
          value: process.version,
          inline: true
        },
        {
          name: 'Discord.JS version',
          value: 'v12 get it [here](https://discord.js.org/#/)',
          inline: true
        }]
      }
    }).then(message => message.delete({timeout: 120000})).catch(console.error)
    await msg.delete().catch(console.log)
  }
}

export {commands}
