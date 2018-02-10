import os from 'os-utils'
import { green } from 'chalk'

class DashboardManger {
  constructor (client) {
    this.client = client
  }

  log (log) {
    for (let i in log) {
      console.log(green(log[i].text) + ' ' + log[i].info)
    }
  }

  info () {
    let client = this.client
    let log = [
      {text: 'Username:', info: client.user.username},
      {text: 'Discriminator:', info: client.user.discriminator},
      {text: 'ID:', info: client.user.id},
      {text: 'Users:', info: client.users.size},
      {text: 'Channels', info: client.channels.size},
      {text: 'Guilds:', info: client.guilds.size},
      {text: 'Platform:', info: os.platform()},
      {text: 'Free Memory (Kb):', info: os.freemem()},
      {text: 'Total Memroy (Kb):', info: os.totalmem()},
      {text: 'Free Memory (%):', info: os.freememPercentage()},
      {text: 'CPU Cores:', info: os.cpuCount()}
    ]
    this.log(log)
  }
}

export { DashboardManger }
