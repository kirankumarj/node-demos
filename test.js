var http = require('http');
var url = require('url');

http.createServer( function(req,res) {
	var resQ = url.parse(req.url,true).query;
	alert(resQ);
	res.end();
});