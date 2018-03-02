class UtlManger {
  constructor (client, db, config) {
    this.client = client
    this.db = db
    this.config = config
  }

  isAdmin (member) {
    if (member.id !== this.config.botOwner) return member.hasPermission('ADMINISTRATOR')
    return true
  }

  isOwner (member) {
    if (member.id !== this.config.botOwner) return false
    return true
  }

  isEval (member) {
    if (this.config.userEval.indexOf(member.id) !== -1) return true
    return false
  }

  isNSFW (channel) {
    return channel.nsfw
  }

  error (msg, err) {
    msg.channel.send(`\`ERROR\` \`\`\`xl\n${this.clean(err)}\n\`\`\``, {split: true}).then(m => this.deleteMsg(m))
  }

  deleteMsg (msg) {
    this.db.ServerDB.findOne({_id: msg.guild.id}, async (err, serverDoc) => {
      if (err) throw err
      if (serverDoc.delete) msg.delete({ timeout: 60000 })
    })
  }

  clean (text) {
    if (typeof (text) === 'string') { return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203)) } else { return text }
  }
}

export { UtlManger }
