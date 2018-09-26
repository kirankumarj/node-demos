// const EventEmitter = require('events');

// // register the listener 
// emitter.on('fireEvent', () => {
//     console.log('Event Fired');
// });

// // raise the event
// emitter.emit('fireEvent');


// emitter.on('eventArg', (arg) => {
//     console.log(` Event fired with argument id :: ${arg.id} url:: ${arg.url}`);
// });
// emitter.emit('eventArg', {id: 1, url: 'google.com'});

const Logger = require('./fireEmit');
const logger = new Logger();


logger.on('fireEvent', (arg) => {
    console.log(`Event fired with arguments id ${arg.id} and Message ${arg.message}`);
});


logger.log('User is login');