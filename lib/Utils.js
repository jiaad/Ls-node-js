const fs = require('fs')
module.exports =  class Utils {

  spaceCalculator(name) {
    const len = name.length
    const maxSpace = 25
    const time = maxSpace - len
    const res = ' '.repeat(time)
    return res
  }
  pushStatsToArray(stats, type, name){
    return {
      name: name, 
      size: stats.size, 
      type: type === true ? 'file' : 'directory', 
      created: stats.birthtime,
      dev:stats.dev,
      mode:stats.mode,
      nlink:stats.nlink,
      uid:stats.uid,
      gid:stats.gid,
      rdev:stats.rdev,
      blksize:stats.blksize,
      ino:stats.ino,
      blocks:stats.blocks,
      atimeMs:stats.atimeMs,
      mtimeMs:stats.mtimeMs,
      ctimeMs:stats.ctimeMs,
      birthtimeMs:stats.birthtimeMs,
      atime:stats.atime,
      mtime:stats.mtime,
      ctime:stats.ctime,
      birthtime:stats.birthtime,
    }
  }
  async doesFileOrDirExists(arg){
    // const args = await this.argvDirectories()
    if (fs.existsSync(`./${arg}`))
      return true

    return false
  }

  async colorizeOutput(element){
    let name;
    if(element.type === 'directory')
      name = element.name.blue
    if(element.type === 'file')
      name = element.name.white
    if(element.mode === 33261)
      name = element.name.red
    return name
  }
}