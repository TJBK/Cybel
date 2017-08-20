let commands = {
  name: 'region',
  use: '<command> <region>',
  desc: 'Set region you live in',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    let gRCountry = await msg.guild.roles.find('name', suffix).id
    let grV = await msg.guild.roles.find('name', 'Verified').id
    let roles = [gRCountry, grV]
    try {
      await msg.member.addRoles(roles)
    } catch (err) {
      await msg.channel.send('You either have this region or try adding a captial letter')
    }
  }
}

export {commands}
