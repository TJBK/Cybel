let commands = {
  name: 'region',
  category: 'admin',
  use: '<command> <region>',
  desc: 'Set region you live in',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    let continents = ['Asia', 'Africa', 'Antarctica', 'Australia', 'Europe', 'Kekistan', 'North America', 'South America']
    let allow
    for (let i = 0; i < continents.length; i++) {
      if (msg.content === continents[i]) allow = true; break
    }
    if (!allow) msg.channel.send('That\'s not a continent')
    let gRCountry = await msg.guild.roles.find('name', suffix).id
    let grV = await msg.guild.roles.find('name', 'Verified').id
    let roles = [gRCountry, grV]
    msg.delete()
    try {
      msg.member.addRoles(roles)
    } catch (err) {
      msg.channel.send('You either have this region or try adding a captial letter').then(message => message.delete({timeout: 60000})).catch(console.error)
    }
  }
}

export {commands}
