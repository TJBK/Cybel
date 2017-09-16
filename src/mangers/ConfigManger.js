import fs from 'fs-extra'
import path from 'path'
import readline from 'readline'

class ConfigManger {
  constructor (client) {
    this.client = client
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
  }

  GetConfig () {
    if (!fs.existsSync(path.resolve(this.client.mangers.dimport._base, 'config.json'))) this.start()
  }

  start () {
    this.rl.question('Token: ', (answer) => {
      let config = {
        token: answer
      }
      this.dbName(config)
    })
  }

  dbName (config) {
    this.rl.question('dbName: ', (answer) => {
      config.dbName = answer
      this.botOwner(config)
    })
  }

  botOwner (config) {
    this.rl.question('botOwner: ', (answer) => {
      config.botOwner = answer.toString()
      this.userEval(config)
    })
  }

  userEval (config) {
    this.rl.question('userEval (user spaces to split): ', (answer) => {
      config.userEval = answer.toString().split(' ')
      this.fin(config)
    })
  }

  fin (config) {
    console.log('Token: ' + config.token + '\ndbName: ' + config.dbName + '\nbotOwner: ' + config.botOwner + '\nuserEval: ' + config.userEval)
    this.rl.question('Is this right yes or no? ', (answer) => {
      switch (answer) {
        case ('yes'):
          let json = JSON.stringify(config)
          fs.writeFile(path.resolve(this.client.mangers.dimport._base, 'config.json'), json, 'utf8', (data) => {
            this.rl.write('We have finished')
            process.exit(0)
          })
          break
        case ('no'):
          this.start()
          break
        default:
          this.fin(config)
      }
    })
  }
}

export { ConfigManger }
