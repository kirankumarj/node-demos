const EventEmitter = require('events');

class User extends EventEmitter{
	isUserValid(arg){
		if(arg.name == 'kiran'){
			this.emit('userValid',arg);
			return true;
		}else {
			this.emit('userNotValid',arg);
			return false;
		}	
	}
}


module.exports = User;