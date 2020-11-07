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
  compareSort(a, b){
    return a.name.localeCompare(b.name)
  }
  async sortFilesAndDirs(res){
    // let up = res.filter(item => item.name[0] === item.name.toUpperCase)
    let up = res.filter(item => (item.name[0] !== '.') && (item.name[0] === item.name[0].toUpperCase())) .sort(this.compareSort)
    let low = res.filter(item => (item.name[0] !== '.') && (item.name[0] === item.name[0].toLowerCase())).sort(this.compareSort)
    let hidden = res.filter(item => item.name[0] === '.').sort(this.compareSort)
    return {up, low, hidden}
  }

  async sortByModified(input){

    let sorted =  input.sort((a, b) => {
        a = (new Date(a.mtimeMs)).getTime();
        b = (new Date(b.mtimeMs)).getTime();
        return b - a;
    });
    return sorted
  }

  async sendDataIfFlagOrNot(input, args){
    let files = await this.sortFilesAndDirs(input)
    if(args.length === 0){
      let data = [...files.up , ...files.low]
      return data
    }
    if( args.length >= 1 && args[0][0] === '-'){
      // under the flag of 'a'
      if(args[0].includes("a")){
        let data;
        data = [...files.hidden, ...files.up, ...files.low]
        if(args[0].includes('t'))
          data = await this.sortByModified(data)
        // if(args[0].includes('l'))
        return data
      }
        // individually
      if(args[0].includes('t')){
        let data;
        data = [...files.up, ...files.low]
        data = await this.sortByModified(data)
        return data
      }
      if(args[0].includes('l')){
        let data
        data = [...files.up, ...files.low]
        return data
      }
    }
  }

  async timeFormatLFlag(giventime){
    let options = { month: 'short' };
    let time = new Date(giventime)
    let month = time.toLocaleDateString('en', options)
    let date = time.getDate()
    let hours = time.getHours()
    let minutes = time.getMinutes()
    let timeFormat = `${date} ${month} ${hours}:${minutes}`
    return timeFormat
  }
}