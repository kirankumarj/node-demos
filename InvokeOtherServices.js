const http = require('http');


function getJson(options, cb){
    http.request(options, (res) => {
        var result = '';
        res.on('data', (chunk) => {
            result+=chunk;
            debugger;
        });
    
        res.on('end', () => {
            var users = JSON.parse(result);
            debugger;
            cb(null, users);
        });

        res.on('error', cb);
    })
    .on('error', cb)
    .end();  
}
const options = {
    host: 'demo5694098.mockable.io',
    path: '/users',
    method: 'GET'
};

getJson(options, (err, result) => {
    if(err) {
        return console.log("error to connecting the server ",err);
    }
    debugger;
    return console.log(result);
});