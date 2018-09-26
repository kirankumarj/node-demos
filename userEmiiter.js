const EventEmitter = require('events');

class User extends EventEmitter{
	isUserValid(arg){
		if(arg.name == 'kiran'){
			return true;
		}else return false;
	}
}


module.exports = User;