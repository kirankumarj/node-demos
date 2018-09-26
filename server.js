var http = require('http');
var url = require('url');

http.createServer( function(req,res) {
	var resQ = url.parse(req.url,true).query;

	res.writeHead(200,{'Content-Type':'text/html'});
	//res.write(resQ.toJSON());
	console.log(resQ);
	res.end();
}).listen(9081);
// console.log("Is it working");
// var http = require('http');

// http.createServer(function(reg,res) {
// 	res.writeHead(200,{'Content-Type' : 'text/html'});
// 	res.write("Hi Hello ..!");

// 	res.end();

// }).listen(9080);