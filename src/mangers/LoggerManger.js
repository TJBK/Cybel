import path from 'path'
import fs from 'fs-extra'

class LoggerManger {
  constructor (client, base) {
    this.client = client
    this.base = base
    this.currentPath = path.resolve(this.base, 'log', this.date() + '.' + this.time() + '.log')
  }

  setup () {
    if (!fs.existsSync(path.resolve(this.base, 'log'))) {
      fs.mkdirSync(path.resolve(this.base, 'log'))
    }
    let location = { logFIle: this.currentPath }
    fs.writeFileSync(path.resolve(this.base, 'log' + '/logFile.json'), JSON.stringify(location), 'utf8')
    fs.readFile(path.resolve(this.base, 'log' + '/logFile.json'), 'utf8', (err, data) => {
      if (err) throw err
      fs.writeFileSync(JSON.parse(data).logFIle, 'Bot started at : ' + this.date() + ':' + this.time())
    })
  }

  date () {
    let currentDate = new Date()
    return 'D.' + currentDate.getDate() + '.' + (currentDate.getMonth() + 1) + '.' + currentDate.getFullYear()
  }

  time () {
    let currentTime = new Date()
    return 'T.' + currentTime.getHours() + '.' + currentTime.getMinutes() + '.' + currentTime.getSeconds()
  }

  write (message) {
    fs.readFile(path.resolve(this.base, 'log' + '/logFile.json'), 'utf8', (err, data) => {
      if (err) throw err
      fs.appendFileSync(JSON.parse(data).logFIle, '\r\n' + this.date() + ':' + this.time() + ': ' + message)
    })
  }
}

export { LoggerManger }
