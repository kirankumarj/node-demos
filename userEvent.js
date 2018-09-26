const User = require('./userEmitter');

const user = new User();

user.on('userValid',(arg)=>{
	console.log(`${arg.name} is valid`);
});


user.on('userNotValid',(arg)=>{
	console.log(`${arg.name} is not valid`);
});


user.isUserValid({name:'anil',password:'kumar'});