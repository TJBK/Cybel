import glob from 'glob'
import path from 'path'

let commands = []
let loadCMD = () => {
  glob.sync(path.join(__dirname) + '/commands/*/*.js').forEach(function (file) {
    let cm = require(path.resolve(file)).commands
    commands.push(cm)
  })
}

export {loadCMD, commands}
