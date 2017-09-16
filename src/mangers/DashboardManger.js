import os from 'os-utils'
import { green } from 'chalk'

class DashboardManger {
  constructor (client) {
    this.client = client
  }

  systemInfo () {
    console.log(green('Platform: ') + os.platform())
    console.log(green('Free Memory (Kb): ') + os.freemem())
    console.log(green('Total Memroy (Kb): ') + os.totalmem())
    console.log(green('Free Memory (%): ') + os.freememPercentage())
    console.log(green('CPU Cores: ') + os.cpuCount())
    os.cpuUsage((v) => {
      console.log(green('CPU Usage (%): ') + v)
    })

    os.cpuFree((v) => {
      console.log(green('CPU Free: ') + v)
    })
  }

  userInfo () {
    let client = this.client
    console.log(`${green('Username:')} ${client.user.username}
${green('Discriminator:')} ${client.user.discriminator}
${green('ID:')} ${client.user.id}
${green('Users:')} ${client.users.size}
${green('Channels:')} ${client.channels.size}
${green('Guilds:')} ${client.guilds.size}`)
  }
}

export { DashboardManger }
