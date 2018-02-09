let commands = {
  name: 'region',
  category: 'admin',
  use: '<command> <region>',
  desc: 'Set region you live in',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    let continents = ['Asia', 'Africa', 'Antarctica', 'Australia', 'Europe', 'Kekistan', 'North America', 'South America']
    if (continents.indexOf(msg.content) !== -1) return msg.channel.send('Sorry that not allowed fam')
    let gRCountry = await msg.guild.roles.find('name', suffix).id
    let roles = [gRCountry]
    msg.delete()
    try {
      msg.member.addRoles(roles)
    } catch (err) {
      msg.channel.send('You either have this region or try adding a captial letter').then(message => message.delete({timeout: 60000})).catch(console.error)
    }
  }
}

export { commands }
