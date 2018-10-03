const express = require('express');
const app = express();
const Joi = require('joi');


var exRoutes = express.Router();

app.use(express.json());
app.get('/',(req,res)=>{
	res.send('Hello world');
});
var Coin = require('./data');

const users = [
	{id: 1, name: 'kiran'},
	{id: 2, name: 'pavan'},
	{id: 3, name: 'anand'},
	{id: 4, name: 'Amrutha'}
];

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kiran",
   database: "osildata"
});

app.get('/users/:id', (req,res) => {
	var user = users.find( u => u.id === parseInt(req.params.id));
	if(!user) res.status(404).send(`${req.params.id} is not found`);
	else res.send(user);
});

exRoutes.route('/u').get(function (req, res) {
   //Coin.find(function (err, coins){
    if(err){
      console.log(err);
    }
    else {
      res.json(users);
    }
 // });
});
con.connect(function(err) {
  			if (err) throw err;
  			console.log("Connected!");
	});


app.get('/users', (req,res) => {

	let query = 'select * from users';


	
	let my = this;
	con.query( query , function(err, result){
		if(err) throw err;
		console.log(JSON.stringify(result));
		res.send(JSON.stringify(result));

	});
});

const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`Listening port ${port}`));


app.post('/adduser', (req, res) => {

	const user = {
		id: users.length + 1,
		name: req.body.name
	}
	 
	 var totalusers = -1;
	 var countTotal = 'SELECT COUNT(*) as total FROM users';
	 con.query(countTotal , function (err, result) {
		if (err) {
			console.log(err);
		}else{
			//console.log("total",result[0].total);
			totalusers = result[0].total + 1;

			let record = [
				[	totalusers,
					req.body.name,
					   parseInt(req.body.age),
					parseInt(req.body.salary)
				]
			];
		
			let result1 = {
				name: req.body.name,
				id: totalusers,
				age: parseInt(req.body.age),
				salary: parseInt(req.body.salary)
			};
			var sql = 'INSERT INTO users (id, name, age, salary ) VALUES ?';
			console.log(req.body.name+"::"+req.body.age+"::"+req.body.salary+"SQL::"+sql);
			
		  con.query(sql, [record], function (err, result) {
		
			if (err) {
				console.log(err);
				return res.send("ERROR");
			}else{
				console.log("1 record inserted",result);
				return res.send(result1);	
			}
		  });
		}
	  });
});

app.post('/users', (req, res) => {

	const user = {
		id: users.length + 1,
		name: req.body.name
	}
	 let record = [
	 	[req.body.name,
		req.body.role,
		parseInt(req.body.id)]
	 ];


	var sql = 'INSERT INTO users (name, role, id ) VALUES ?';
	console.log(req.body.name+"::"+req.body.role+"::"+req.body.id+"SQL::"+sql);
	
  con.query(sql, [record], function (err, result) {

    if (err) {
    	console.log(err);
    	return res.send("ERROR");
    }else{
    	console.log("1 record inserted");
    return res.send("SUCCESS");	
    }
  });
});


app.post('/enroll', (req, res) => {

	
req.body.forEach(function(ele){
	console.log(ele.day);

	let b = ele.b ? "Y" : "N"; 
	let l = ele.l ? "Y" : "N"; 
	let d = ele.d ? "Y" : "N"; 
	console.log(b +' - '+ l + ' - ' + d);
	let record = [
	 	[ele.id,
		ele.name,
		ele.day,
		b,
		l,
		d,
		]
	 ];
	var sql = 'INSERT INTO enroll (id , name, dates, breakfast, lunch, dinner ) VALUES ?';

	 con.query(sql, [record], function (err, result) {

	    if (err) {
	    	console.log(err);
	    	// return res.send("ERROR");
	    }else{
	    	console.log("1 record inserted");
	    }
	  });

});
	


	return res.send("SUCCESS");	
});


app.get('/user', (req,res) => {


var name = req.param('name');

console.log(name);


	let query = "select * from users where name='"+name+"' or id='"+req.param('id')+"' or role ='"+req.param('role')+"'";

	
	let my = this;
	con.query( query , function(err, result){
		if(err) throw err;
		console.log(JSON.stringify(result));
		res.send(JSON.stringify(result));

	});
});



app.get('/details', (req,res) => {


var name = req.param('date');

console.log(name);


	let query = "select * from enroll where dates='"+name+"'";

	
	let my = this;
	con.query( query , function(err, result){
		if(err) throw err;
		console.log(JSON.stringify(result));
		res.send(JSON.stringify(result));

	});
});



app.put('/users/:id', (req,res) => {
	var user = users.find( u => u.id === parseInt(req.params.id));
	if(!user) res.status(404).send(`${req.params.id} is not found`);
	
	const { error } = validateUser(req.body);
	if(error){
		res.status(400).send(error.details[0].message);
		return;
	}

	user.name = req.body.name;
	res.send(user);
});


app.delete('/users/:id', (req,res) => {
	
	const user = users.find( u => u.id === parseInt(req.params.id));
	if(!user) res.status(404).send(`${req.params.id} is not found`);

	const index = users.indexOf(user);
	users.splice(index, 1);

	res.send(user);


});



function validateUser(user){
	const schema = {
		name: Joi.string().min(3).max(10).required()
	}
	return Joi.validate(user, schema);
}

