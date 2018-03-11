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

function normalizeTemp(temp){
    // y=mx+c
    let tempHighLimit = 50;
    let tempLowLimit = -20;
    let m = 100/(tempHighLimit - tempLowLimit);
    let c = 100 - (tempHighLimit * m);
    let result = Math.round(m * temp + c);
    if(result == -0){
        result = 0;
    }
    return result;
}

function normalizeCO2(co2){
    let highLimit = 1500;
    let lowLimit = 200;
    let m = 100/(highLimit - lowLimit);
    let c = 100 - (highLimit * m);
    let result = Math.round(m * co2 + c);
    if(result == -0){
        result = 0;
    }
    return result;
}

function normalizeVOC(voc){
    let highLimit = 1500;
    let lowLimit = 0;
    let m = 100/(highLimit - lowLimit);
    let c = 100 - (highLimit * m);
    let result = Math.round(m * voc + c);
    if(result == -0){
        result = 0;
    }
    return result;
}

mongo.connect(mongoURI, (err, client) => {
    if (err) return console.log(err);

    db = client.db("hacktheburgh");
    app.listen(8000, 'localhost', () => console.log("Server started!"));
});

app.post("/api/sensors", (req, res) => {
    //temperature, air quality, humidity, light sensor
    console.log(req.body);
    let entry = {
        temperature: req.body.Temperatures,
        CO2: req.body.CO2,
        totalVOC: req.body.TotalVOC,
        humidity: req.body.Humidity,
        light: req.body.Light,
        date: new Date()
    };
    db.collection("readings").insertOne(entry, (err, res) => {
        if (err) throw err;
    }) 
    res.sendStatus(200);

});

app.get("/", (req, res) => {
    let date = new Date();
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    db.collection("readings").find().limit(10).sort({
        date: -1
    }).project({
        _id: 0,
        CO2: 1,
        totalVOC: 1,
        temperature: 1,
        humidity: 1,
        light: 1,
        date: 1
    }).toArray((err, result) => {
        res.render("home.ejs", {
            result: result[0],
            normalizedTemp: normalizeTemp(result[0].temperature),
            normalizedCO2: normalizeCO2(result[0].CO2),
            normalizedVOC: normalizeVOC(result[0].totalVOC),
            results: result.reverse()
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