var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/mydb";
const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const port = 9000;

//app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
//app.use(bodyParser.raw());
//app.use(bodyParser.text());


MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.createCollection("customers", function (err, result) {
        db.close();
    });
});

app.get('/', function (req, res) {
    var d = new Date();
    console.log("We got time connection");
    resText = "Server time is " + d.toISOString();
    res.send(resText);
});

app.get('/get-all-users', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("users").find({}).toArray(function (err, result) {
            console.log(result);
            res.send(result);
            db.close();
        });
    });
});


app.post('/add-user', function (req, res) {
    
    MongoClient.connect(url, { useNewUrlParser: true } , function (err, db) {
        var dbo = db.db("mydb");
        console.log(req.body);
        var myobj = { _id: ObjectId(req.body._id), name: req.body.name, correct: 0, total: 0 };
        res.send(myobj);
        dbo.collection("users").insertOne(myobj, function (err, result) {
            db.close();
        });
    });
});

app.post('/update-total', function (req, res) {

    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        var dbo = db.db("mydb");
        console.log(req.body);
        var query = { _id: req.body._id };
        var myobj = {
            $set: { total: req.body.total }
        };
        res.send(myobj);
        dbo.collection("users").updateOne(query, myobj, function (err, result) {
            res.send("OK");
            db.close();
        });
    });
});

app.post('/update-correct', function (req, res) {

    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        var dbo = db.db("mydb");
        console.log(req.body);
        var query = { _id: req.body._id };
        var myobj = {
            $set: { correct: req.body.correct }
        };
        dbo.collection("users").updateOne(query, myobj, function (err, result) {
            res.send("OK");
            db.close();
        });
    });
});


app.get('/find-user/:id', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var response = "No user found";
        var dbo = db.db("mydb");
        var id = req.params.id;
        dbo.collection("users").findOne({ _id: id }, function (err, result) {
            if (result != null) {
                response = result;
            }
            res.send(response);
            db.close();
        });
    });
});




var server = app.listen(port, function () {
    console.log("We have started our server on port 9000");
});