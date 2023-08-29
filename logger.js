class Logger{
    static log(time, str){
        console.log(`[LOG] (${time}) | ${str}`)
    }

    static warn(time, str){
        console.log(`[WARN] (${time}) | ${str}`)
    }

    static error(time, str){
        console.log(`[ERROR] (${time}) | ${str}`)
    }
}

module.exports = {Logger}