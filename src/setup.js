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
    fin(config)
  })
}

let fin = (config) => {
  console.log(config)
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
