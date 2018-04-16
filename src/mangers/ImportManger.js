import path from 'path'
import read from 'readdir-recursive'

class ImportManger {
  constructor (client, base) {
    this.client = client
    this.base = base
    this.imports = {}
  }

  init () {
    ImportManger.fLoad.forEach(folder => {
      this.load(folder)
    })
  }

  load (folders) {
    let folder = path.resolve(this.base, folders)
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
        if (!this.imports[folders]) this.imports[folders] = {}
        this.imports[folders][file] = imported
      })
    } catch (err) {
      throw err
    }
  }

  getImport (folders) {
    let imported = this.imports[folders]
    if (!imported) this.load(folders)
    return Object.assign({}, this.imports[folders])
  }
}

ImportManger.fLoad = ['commands']

export { ImportManger }
