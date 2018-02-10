let config
let initUtl = () => {
  config = require('./config.json')
}

export let isAdmin = (member) => {
  if (member.id !== config.botOwner) return member.hasPermission('ADMINISTRATOR')
  return true
}

export let isOwner = (member) => {
  if (member.id !== config.botOwner) return false
  return true
}

export let isEval = (member) => {
  if (config.userEval.indexOf(member.id) !== -1) return true
  return false
}

export let isNSFW = (channel) => {
  return channel.nsfw
}

export let error = (msg, err) => {
  msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``, {split: true}).then(message => message.delete({timeout: 60000})).catch(console.error)
}

export let clean = (text) => {
  if (typeof (text) === 'string') { return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203)) } else { return text }
}

export { initUtl }
