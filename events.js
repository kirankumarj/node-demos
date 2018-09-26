const EventEmitter = require('events');

const emitter = new EventEmitter();


// emitter.on('isUserValid',function(arg){
// 	console.log(`${arg.name} user is valid`);
// });

//ES6 
emitter.on('isUserValid',(arg) => {
	console.log(`${arg.name} user is valid`);
});
emitter.emit('isUserValid',{name:'kiran', password:'kumar'});



