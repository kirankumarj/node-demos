myMod = require('./myModule');



console.log(myMod.cal(200,300));


const path = require('path');


var pathObj = path.parse(__filename);


console.log(pathObj);

console.log('File extension :: '+pathObj.ext);



const os = require('os');

console.log('OS Free memory  ::' +os.freemem());


console.log('OS free total memory ::' +os.totalmem());



var freeMemory = os.freemem();

console.log(`OS Free memory  :: ${freeMemory}`);


const fs = require('fs');


const fileSyn = fs.readdirSync('./');

console.log(`list of files in dir (read in sync):: ${fileSyn}`);


fs.readdir('../',function(err, files){
if(err) console.log(`error :: ${err}`);
else
console.log(`list of files in parent dir (read in async):: ${files}`);
});