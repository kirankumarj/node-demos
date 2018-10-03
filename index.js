const express = require('express');
const Joi = require('joi');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const mongo = require('mongodb');

const mongodbUrl = 'mongodb://localhost:27017/aidms';
var url = "mongodb://localhost:27017/";

app.use(express.json());
var users = [
    {id: 1 , name: 'kiran', role: 'sse'},
    {id: 2 , name: 'pavan', role: 'se'},
    {id: 3 , name: 'anil', role: 'rm'},
];

const schema = {
    first_name: Joi.string().min(3).required(),
    last_name: Joi.string().min(2).required(),
    age: Joi.number().required()
};
app.get('/', (req, res) => {
    res.send("Hello...!");
});

app.get('/api/users/', (req, res) => {
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
        var dbo = db.db("aidms");
            // dbo.collection("users").find({}).toArray(function(err, result) {
            //     if (err) throw err;
            //     console.log(result);
            //     db.close();
            //     res.send(result);
            // });

            dbo.collection("users").find({}, { projection: { _id: 1, first_name: 1, age : 1 } }).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);

                db.close();
                res.send(result);
            });
    });
});

app.get('/api/users/:id', (req, res) => {
    var id = req.params.id;
    if(!id){
        res.status(204).send('Id not empty');
    }

    MongoClient.connect(mongodbUrl, (err, db) => {
        if(err) { 
            console.log("Unable to connect the server", err);
        } else {
            MongoClient.connect(mongodbUrl, function(err, db) {
                if (err) throw err;
                var dbo = db.db("aidms");
                var query = { last_name: id };
                dbo.collection("users").find( query, { projection: { _id: 0 } }).toArray(function(err, result) {
                  if (err) throw err;
                  console.log(result);
                  db.close();
                  res.send(result);
                });
              });
        }
    });
});

app.get('/api/user/', (req, res) => {
    var reqUserName = req.query.name;
    var location = users.indexOf(reqUserName);
    if(reqUserName !== '' && location > -1){
        return res.send(`User ${reqUserName} found`);
    }else {
        return res.send(`User ${reqUserName} not found`);
    }
});

app.post('/api/users/', (req, res) => {
    var result = validate(req.body);
    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }
    const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age:req.body.age 
    };
    MongoClient.connect(url, function(err, db) {
        if(err) throw err;
        var dbo = db.db("aidms");

        dbo.collection("users", function(err, collection) {
            if(err) throw err;
            collection.insertOne(user, function(err, result) {
                if(err) throw err;
                console.log(result)
                res.send(result);
            });
        });
    });
});

app.put('/api/users/:id', (req,res) => {
    // let user = users.find(user => user.id == req.params.id);
    // if(!user) {
    //     return res.status(400).send('Id not found');
    // }
    // const { error } = validate(req.body); // object distraction 
    // if(error){
    //     return res.status(400).send(error.details[0].message);
    // }
    // user.name = req.body.name;
    // user.role = req.body.role;

    // return res.send(user);


    var o_id = new mongo.ObjectID(req.params.id);

    if(!o_id) {
        return res.status(400).send("Invalid the request ID");
    }

    var updateUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: req.body.age,
    };

    console.log(updateUser);

    MongoClient.connect( url, function(err, db) {
        if(err) throw err;

        var dbo = db.db("aidms");
        dbo.collection("users").updateOne({_id: o_id}, {$set: updateUser}, function(err, result) {
          if (err) throw err;
          console.log("1 document updated",result);
          db.close();
          res.send(result);
        });
    }); 
});

app.delete('/api/users/:id', (req,res) => {
    //let user = users.find(user => user.id == req.params.id);
    // if(!user) {
    //     return res.status(400).send('Id not found');
    // }
    // var _id = req.params.id;
    // users.splice(user);
    // return res.send(user);

    var o_id = new mongo.ObjectID(req.params.id);
    MongoClient.connect(url, function(err, db) {
        if(err) throw err;
        var dbo = db.db("aidms");

        dbo.collection("users", function(err, collection) {
            if(err) throw err;
            collection.deleteOne({_id: o_id}, function(err, result) {
                if(err) throw err;
                console.log(result)
                res.send(result);
            });
        });
    });
});

var port = process.env.PORT || 3004;

app.listen(port, () => {
    console.log(`Listening the port ${port}..!`);
});

function validate(user){
    return Joi.validate(user, schema);
}