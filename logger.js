const url = '192.168.6.124:8080';
function logger(log){
	console.log(log);
}

module.exports.logger = logger;

module.exports.endPoint = url;