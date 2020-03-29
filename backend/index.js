var express = require('express');
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser')
var cors = require('cors');
var port = 8080;
var app = express();
var User = require('./UserModel');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use(bodyParser.json({limit: '50mb'}));

const { mongoDB } = require('./config');
const mongoose = require('mongoose');

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 500,
    bufferMaxEntries: 0
};

mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});

app.get('/users', (req, res) => {
    User.find({}, (error, result) => {
        if (error) {
           
            res.json({"error":"failure"});
        }  else {
           
            res.json({"result":result});
        }

    });
  });
  


  app.post('/users/adduser', (req, res) => {


    var data = new User({
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      image: req.body.image,
      medics: req.body.medics,
      notes: req.body.notes
    
    });
    console.log(data)
    data.save((err, result) => {
      if (err) {
        console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})
      }
      res.json({"result":"success"})
    });
  });

app.listen(port);
console.log("Server Listening on port 8080");
module.exports = app;