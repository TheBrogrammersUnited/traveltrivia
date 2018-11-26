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
    console.log("HOST : ", req.hostname);
    console.log("IP : ", req.ip);
    console.log("TYPE :", "GET");
    console.log("URL :", req.url);
    resText = "Server time is " + d.toISOString();
    res.json(resText);
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
            client_id: 'IA2NOA32N1DSXWKGLL3EEH3EMLTOEQUIE3C35D3FQIQ1KVF0',
            client_secret: '0JK05IWNFDGFASBCEWBUKBTWFCVDZGPC3K0LW5R1TAJE2H5I',
            ll: lola,
            query: 'restaurant',
            radius: '2000',
            intent: 'browse',
            v: '20180323',
            limit: 7
        }
    }, function (err, response, msg) {
        if (err) {
            console.error(err);
        } else {
            var body = JSON.parse(msg);
            var l = body.response.venues.length;
            var index = Math.floor(Math.random() * (+l - +0)); 
            var kmdist = distance(parseFloat(body.response.venues[index].location.lat), parseFloat(body.response.venues[index].location.lng), parseFloat(req.params.la), parseFloat(req.params.lo));
            var dist = kmToMiles(kmdist);
            var incorrect = [dist + Math.random() % l,  dist - (dist/2) + Math.random() , dist % l * l / 4];
            var o = {};
            var key = 'results';
            o[key] = [];
            var data = {
                category: 'Location',
                type: 'multiple',
                difficulty: 'none',
                question: 'How far is ' + body.response.venues[index].name + ' from your current location?',
                correct_answer: dist.toFixed(2),
                incorrect_answer: [incorrect[0].toFixed(2), incorrect[1].toFixed(2), incorrect[2].toFixed(2)]
            };
            o[key].push(data);
            //console.log(JSON.stringify(o));
            res.json(o);
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
            res.json(result);
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
        res.json(myobj);
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
            res.json(result);
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
        var response = { total: -1 };
        var dbo = db.db("mydb");
        var id = req.params.id;
        dbo.collection("users").findOne({ _id: id }, function (err, result) {
            if (result != null) {
                response = { total: result.total };
            }
            console.log("RESP :", response);
            console.log("\n--------END OF CONNECTION--------\n\n");
            res.json(response);
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
        var response = { correct: -1};
        var dbo = db.db("mydb");
        var id = req.params.id;
        dbo.collection("users").findOne({ _id: id }, function (err, result) {
            if (result != null) {
                response = {correct: result.correct};
            }
            console.log("RESP :", response);
            res.json(response);
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
            res.json("{status: 1}");
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
            res.json("{status:1}");
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
        var response = { _id: -1 };
        var dbo = db.db("mydb");
        var id = req.params.id;
        dbo.collection("users").findOne({ _id: id }, function (err, result) {
            if (result != null) {
                response = result;
            }
            //res.set('Content-Type', 'application/json');
            res.json(response);
            console.log("RESP :", response);
            console.log("\n--------END OF CONNECTION--------\n\n");
            db.close();
        });
    });
});

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
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


process.on('uncaughtException', UncaughtExceptionHandler);

function UncaughtExceptionHandler(err) {
    console.log("Uncaught Exception Encountered!!");
    console.log("err: ", err);
    console.log("Stack trace: ", err.stack);
    setInterval(function () { }, 1000);
}
