import readline from 'readline'
import fs from 'fs'
import path from 'path'

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let start = () => {
  rl.question('Token: ', (answer) => {
    let config = {
      token: answer
    }
    dbName(config)
  })
}

let dbName = (config) => {
  rl.question('dbName: ', (answer) => {
    config.dbName = answer
    botOwner(config)
  })
}

let botOwner = (config) => {
  rl.question('botOwner: ', (answer) => {
    config.botOwner = answer.toString()
    userEval(config)
  })
}

let userEval = (config) => {
  rl.question('userEval (user spaces to split): ', (answer) => {
    config.userEval = answer.toString().split(' ')
    fin(config)
  })
}

let fin = (config) => {
  console.log('Token: ' + config.token + '\ndbName: ' + config.dbName + '\nbotOwner: ' + config.botOwner + '\nuserEval: ' + config.userEval)
  rl.question('Is this right yes or no? ', (answer) => {
    switch (answer) {
      case ('yes'):
        let json = JSON.stringify(config)
        fs.writeFile(path.join(__dirname) + '/config.json', json, 'utf8', (data) => {
          rl.write('We have finished')
          process.exit(0)
        })
        break
      case ('no'):
        start()
        break
      default:
        fin(config)
    }
  })
}

start()
