module.exports = class ArgvHandler {
    constructor() {
        
    }

    argvDirectories(){
      let arr = process.argv.slice(2)
      let  args = [];
      arr.forEach(i => {
        if(!i.startsWith('-')){
          args.push(i)
        }
      })
      return args
    }

}