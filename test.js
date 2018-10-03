const express = require('express');

const app = express();


app.get('/', (req, res) => {
    res.send("Hello...!");
});

app.listen(3004, () => {
    console.log('Listening the port 3004..!');
});