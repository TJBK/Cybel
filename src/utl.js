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

export {initUtl}
