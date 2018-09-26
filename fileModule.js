const fs = require('fs');

var files = fs.readdirSync('./');

console.log(files);


fs.readdir('./', function(err, listFiles) {
    if(err) {
        console.log(err);
    } 
    console.log(listFiles); 
})