var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/mydb";
const express = require('express')
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const port = 9000;
var d = new Date();

app.use(bodyParser.json());


MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    var dbo = db.db("mydb");
    dbo.createCollection("customers", function (err, result) {
        db.close();
    });
});

app.get('/', function (req, res) {
    console.log("\n--------START OF CONNECTION--------\n");
    console.log("TIME :", d.toISOString());
    console.log("TYPE :", "GET");
    console.log("URL :", req.url);
    resText = "Server time is " + d.toISOString();
    res.send(resText);
    console.log("RESP :", resText);
    console.log("\n--------END OF CONNECTION--------\n\n");
});

app.get('/get-location-question/:la&:lo', function (req, res) {
    console.log("\n--------START OF CONNECTION--------\n");
    console.log("TIME :", d.toISOString());
    console.log("TYPE :", "GET");
    console.log("URL :", req.url);
    var lola = req.params.la + "," + req.params.lo;
    request({
        url: 'https://api.foursquare.com/v2/venues/search',
        method: 'GET',
        qs: {
            client_id: 'IA2NOA32N1DSXWKGLL3EEH3EM5LTOEQUIE3C35D3FQIQ1KVF0',
            client_secret: '0JK05IWNFDGFASBCEWBUKBTWFCVDZGPC3K0LW5R1TAJE2H5I',
            ll: lola,
            radius: '500',
            intent: 'browse',
            v: '20180323',
            limit: 5
        }
    }, function (err, response, msg) {
        if (err) {
            console.error(err);
        } else {
            var body = JSON.parse(msg);
            var l = body.response.venues.length;
            var dist = distance(parseFloat(body.response.venues[index].location.lat), parseFloat(body.response.venues[index].location.lng), parseFloat(req.params.la), parseFloat(req.params.lo));
            var index = Math.floor(Math.random() * (+l - +0)) + +0; 
            var o = {} // empty Object
            var key = 'results';
            o[key] = [];
            var data = {
                category: 'Location',
                type: 'multiple',
                difficulty: 'none',
                question: 'How far is ' + body.response.venues[index].name + ' from your current location?',
                correct_answer: dist,
                incorrect_answer: [dist + 0.1, dist - 0.1, dist + 0.2]
            };
            o[key].push(data);
            //console.log(JSON.stringify(o));
            res.send(JSON.stringify(o));
            console.log("\n--------END OF CONNECTION--------\n\n");
        }
    });

});

app.get('/get-all-users', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        console.log("\n--------START OF CONNECTION--------\n");
        console.log("TIME :", d.toISOString());
        console.log("TYPE :", "GET");
        console.log("URL :", req.url);
        var dbo = db.db("mydb");
        dbo.collection("users").find({}).toArray(function (err, result) {
            res.send(result);
            console.log("RESP :", result);
            console.log("\n--------END OF CONNECTION--------\n\n");
            db.close();
        });
    });
});


app.post('/add-user', function (req, res) {
    
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        console.log("\n--------START OF CONNECTION--------\n");
        console.log("TIME :", d.toISOString());
        console.log("TYPE :", "POST");
        console.log("URL :", req.url);
        var dbo = db.db("mydb");
        var myobj = { _id: req.body.id, name: req.body.name, correct: 0, total: 0 };
        res.send(myobj);
        console.log("RESP :", myobj);
        dbo.collection("users").insertOne(myobj, function (err, result) {
            db.close();
            console.log("\n--------END OF CONNECTION--------\n\n");
        });
    });
});

app.post('/update-total', function (req, res) {

    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        console.log("\n--------START OF CONNECTION--------\n");
        console.log("TIME :", d.toISOString());
        console.log("TYPE :", "POST");
        console.log("URL :", req.url);
        var dbo = db.db("mydb");
        var query = { _id: req.body.id };
        var myobj = {

            $set: { total: req.body.total }
        };
        dbo.collection("users").updateOne(query, myobj, function (err, result) {
            res.send(result);
            console.log("RESP :", query, myobj);
            console.log("\n--------END OF CONNECTION--------\n\n");
            db.close();
        });
    });
});

app.get('/get-total/:id', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        console.log("\n--------START OF CONNECTION--------\n");
        console.log("TIME :", d.toISOString());
        console.log("TYPE :", "GET");
        console.log("URL :", req.url);
        var response = JSON.stringify({ total: -1 });
        var dbo = db.db("mydb");
        var id = req.params.id;
        dbo.collection("users").findOne({ _id: id }, function (err, result) {
            if (result != null) {
                response = JSON.stringify({ total: result.total });
            }
            console.log("RESP :", response);
            console.log("\n--------END OF CONNECTION--------\n\n");
            res.send(response);
            db.close();
        });
    });
});

app.get('/get-correct/:id', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        console.log("\n--------START OF CONNECTION--------\n");
        console.log("TIME :", d.toISOString());
        console.log("TYPE :", "GET");
        console.log("URL :", req.url);
        var response = JSON.stringify({ correct: -1});
        var dbo = db.db("mydb");
        var id = req.params.id;
        dbo.collection("users").findOne({ _id: id }, function (err, result) {
            if (result != null) {
                response = JSON.stringify({ correct: result.correct});
            }
            console.log("RESP :", response);
            res.send(response);
            console.log("\n--------END OF CONNECTION--------\n\n");
            db.close();
        });
    });
});

app.post('/update-correct', function (req, res) {

    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        console.log("\n--------START OF CONNECTION--------\n");
        console.log("TIME :", d.toISOString());
        console.log("TYPE :", "POST");
        console.log("URL :", req.url);
        var dbo = db.db("mydb");
        var query = { _id: req.body.id };
        var myobj = {
            $set: { correct: req.body.correct }
        };
        console.log("RESP :", query, myobj);
        dbo.collection("users").updateOne(query, myobj, function (err, result) {
            res.send("OK");
            console.log("\n--------END OF CONNECTION--------\n\n");
            db.close();
        });
    });
});

app.post('/update-correct-total', function (req, res) {

    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        console.log("\n--------START OF CONNECTION--------\n");
        console.log("TIME :", d.toISOString());
        console.log("TYPE :", "POST");
        console.log("URL :", req.url);
        var dbo = db.db("mydb");
        var query = { _id: req.body.id };
        var myobj = {
            $set: { correct: req.body.correct, total: req.body.total },
        };
        dbo.collection("users").updateOne(query, myobj, function (err, result) {
            res.send("OK");
            console.log("RESP :", query, myobj);
            console.log("\n--------END OF CONNECTION--------\n\n");
            db.close();
        });
    });
});


app.get('/find-user/:id', function (req, res) {
    console.log(req.url);
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        console.log("\n--------START OF CONNECTION--------\n");
        console.log("TIME :", d.toISOString());
        console.log("TYPE :", "GET");
        console.log("URL :", req.url);
        var response = JSON.stringify({ _id: -1 });
        var dbo = db.db("mydb");
        var id = req.params.id;
        dbo.collection("users").findOne({ _id: id }, function (err, result) {
            if (result != null) {
                response = result;
            }
            res.send(response);
            console.log("RESP :", response);
            console.log("\n--------END OF CONNECTION--------\n\n");
            db.close();
        });
    });
});




var server = app.listen(port, function () {
    console.log("We have started our server on port 9000");
});


function distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 +
        c(lat1 * p) * c(lat2 * p) *
        (1 - c((lon2 - lon1) * p)) / 2;

    return 12742 * Math.asin(Math.sqrt(a));
}

function kmToMiles(distInKm) {
    return 0.6213712 * distInKm;
}
