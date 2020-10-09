const Utils = require('./Utils')

module.exports = class ArgvHandler extends Utils {
    constructor() {
        super()
    }

    async argvDirectories(){
      let arr = process.argv.slice(2)
      let  args = [];
      for (const i of arr) {
        if(!i.startsWith('-')){
          let isDir = await this.doesFileOrDirExists(i)
          if(isDir) args.push(i)
        }
      }
      return args
    }

    async getBadTyppedDir(){
      let argv = process.argv.slice(2)
      let res = []
    
      for (const i of argv) {
        // let dir = await fs.promises.opendir(i)
        const isDir = await this.doesFileOrDirExists(i)
        if(!isDir) res.push(i)
      }
      console.log(res), '£££££££'
      return res
    }
    
    async showDirectoryErrors(){
      let badTyppedDir = await this.getBadTyppedDir()
      // let dir = await fs.promises.opendir(directory) // OPEN THE DIR 
      for (const dirName of badTyppedDir) {
        try {
          const dir = await this.printErrorIfDirNotExists(dirName)
        } catch (error) {
          process.stdout.write(error + '\n')
        }
      }
    }
}