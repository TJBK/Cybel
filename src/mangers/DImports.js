import path from 'path'
import read from 'readdir-recursive'

class DImports {
  constructor (bot, base) {
    this._bot = bot
    this._base = base
    this._imports = {}
  }

  get base () {
    return this._base
  }

  get bot () {
    return this._bot
  }

  init () {
    DImports.fLoad.forEach(folder => {
      this.load(folder)
    })
  }

  load (folders) {
    let folder = path.resolve(this._base, folders)
    try {
      read.fileSync(folder).forEach(file => {
        let basename = path.basename(file)
        if (basename.startsWith('_') || !basename.endsWith('.js')) return
        let imported
        try {
          imported = require(file).commands
        } catch (err) {
          throw err
        }
        if (!this._imports[folders]) {
          this._imports[folders] = {}
        }

        this._imports[folders][file] = imported
      })
    } catch (err) {
      throw err
    }
  }

  getImport (folders) {
    let imported = this._imports[folders]
    if (!imported) {
      this.load(folders)
    }
    return Object.assign({}, this._imports[folders])
  }
}

DImports.fLoad = ['commands']

export {DImports}
