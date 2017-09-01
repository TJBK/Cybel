import {botOwner, userEval} from './config.json'

export let isAdmin = (member) => {
  if (member.id !== botOwner) return member.hasPermission('ADMINISTRATOR')
  return true
}

export let isOwner = (member) => {
  if (member.id !== botOwner) return false
  return true
}

export let isEval = (member) => {
  if (userEval.indexOf(member.id) !== -1) return true
  return false
}

export let isNSFW = (channel) => {
  return channel.nsfw
}
