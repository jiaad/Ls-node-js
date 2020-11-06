const fs = require('fs');
const { type } = require('os');
const util = require('util');
const Utils = require('./Utils')

const fsAccess = util.promisify(fs.access)
const lstat = util.promisify(fs.lstat)

module.exports = class ArgvHandler{
    constructor() {
        this.utils = new Utils()
    }
    
    async changeDir(){
      let path = process.cwd()
      console.log(path)
      return path
    }
    async argvDirectories(){
      let arr = process.argv.slice(2)
      let upcaseFiles = []
      let downcaseFiles = []
      let files = []

      let dirs = []

      let  args = [];
      for (const i of arr) {
        if(!i.startsWith('-')){
          let isDir = await this.utils.doesFileOrDirExists(i)
          if(isDir){
            let isFile = (await lstat(i)).isFile()
            if(isFile){
              i[0] === i[0].toUpperCase() ? upcaseFiles.push(i) : downcaseFiles.push(i)
            }else
              dirs.push(i)
          }
        }
      }
      return { files: {upcaseFiles, downcaseFiles}, dirs }
    }

    async getBadTyppedDir(){
      let argv = process.argv.slice(2)
      let res = []
      let files = []
      let dirs = []

      for (const i of argv) {
        // let dir = await fs.promises.opendir(i)
        const isDir = await this.utils.doesFileOrDirExists(i)
        if(!isDir) res.push(i)
      }
      // console.log('*****',res, '*****')
      return res
    }

    async  printErrorIfDirNotExists(path) {
      try {
      const dir = await fsAccess(path)
      } catch (e) {
          const dirPath = e.path
          throw 'ls: ' + dirPath + ': No such file or directory :`('
      }
    }

    async showDirectoryErrors(){
      const err = []
      let badTyppedDir = await this.getBadTyppedDir()
      // let dir = await fs.promises.opendir(directory) // OPEN THE DIR 
      for (const dirName of badTyppedDir) {
        try {
          const dir = await this.printErrorIfDirNotExists(dirName)
        } catch (error) {
          err.push(error)
        }
      }
      err.sort()
      for (const msg of err) {
        process.stdout.write(msg + "\n")
      }
      // process.stdout.write('\n')
  }
    

  async flagHandle(){
    let args = process.argv.slice(2)
    let res = []
    for (const el in args) {
      if(el.startsWith('-')){
        res.push(el)
      }
    }
    return res
  }

  removeHiddenFilesAndDirs(stats){
    let args = process.argc.slice(2)
    
  }
}