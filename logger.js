class Logger{
    log(time, str){
        console.log("log")
    }

    warn(time, str){
        console.log("warn")
    }

    critical(time, str){
        console.log("critical")
    }
}

module.exports = Logger
