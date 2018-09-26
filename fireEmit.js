const EventEmitter = require('events');


class Logger extends EventEmitter{
    log(message){
        console.log(`Message :: ${message}`);

        this.emit('fireEvent', {id: 2, message: message});
    }
}

module.exports = Logger;