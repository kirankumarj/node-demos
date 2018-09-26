const http = require('http');

const server = http.createServer((req, res) => {
    console.log('control');
    if(req.url === '/'){
        res.write('Hello...!');
    }

    if(req.url === '/api'){
        res.write('Hello...!');
    }
});

console.log('Listening to port 3009..');
server.listen(3009);