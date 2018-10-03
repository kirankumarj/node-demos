const file = require('fs');

var data = file.readFileSync('readfile.txt', 'utf8');

console.log(data);


// if(data) {
//     file.writeFileSync('writefile.txt', data);
// }

// asyncronize 


file.readFile('readfile.txt', 'utf8', function(err, data) {
    if(err) console.log(err);
    console.log(data);
    if(data) {
        file.writeFile('writefile2.txt', data);
    }
});




