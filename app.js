const express = require("express");
const app = express();
const request = require("request");
const mongo = require("mongodb").MongoClient;
const mongoURI = "mongodb://admin:root@ds111279.mlab.com:11279/hacktheburgh";
let PORT = process.env.PORT || 8080;
const apiKey = "f37b438cafd69c1c9b4487032b19451f";
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static("public"));

mongo.connect(mongoURI, (err, client) => {
    if (err) return console.log(err);

    db = client.db("hacktheburgh");
    app.listen(8000, 'localhost', () => console.log("Server started!"));
});

app.post("/api/sensors", (req, res) => {
    //temperature, air quality, humidity, light sensor
    let entry = {
        temperature: req.body.temp,
        airQuality: req.body.air,
        humidity: req.body.humidity,
        light: req.body.light,
        date: new Date()
    };
    db.collection("readings").insertOne(entry, (err, res) => {
        if (err) throw err;
    })
    res.sendStatus(200);

});

app.get("/", (req, res) => {
    db.collection("readings").find().sort({
        date: -1
    }).project({
        _id: 0,
        airQuality: 1,
        temperature: 1,
        humidity: 1,
        light: 1,
        date: 1
    }).toArray((err, result) => {
        res.render("home.ejs", {
            result: result[0]
        });
    });
});

app.get("/api/weather/:city", (req, res) => {

    let requestString = "http://api.openweathermap.org/data/2.5/weather?q=" + req.params.city + "&APPID=" + apiKey + "&units=metric";

    let parameters = {
        APPID: apiKey,
        q: req.params.city
    };

    request({
        url: requestString,
        qs: parameters
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            answer = JSON.parse(body);
            weather = answer["weather"][0]["main"];
            temperature = answer["main"]["temp"];
        } else {
            weather = "error";
            temperature = "error";
        }

        result = "Weather in " + req.params.city + ": " + weather + " and " + temperature + "ºC";
        res.send(result);
    });
});