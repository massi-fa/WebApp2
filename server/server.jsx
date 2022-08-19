const express = require('express');
const mongoose = require('mongoose');
const awsIot = require('aws-iot-device-sdk');
const connectDB = require('./config/db');
const { query } = require('express');

const name = 'ESP32_Meteo';
const  thingShadows = awsIot.thingShadow({
    keyPath: './devices/esp32/privateKey.key',
    certPath: './devices/esp32/deviceCert.crt',
    caPath: './devices/esp32/AmazonRootCA1.pem',
    clientId: 'Meteo1', //nome policy
    host: 'a8bjo0oi9t9yw-ats.iot.ap-south-1.amazonaws.com', //endpoint dispositivo
})

var humidityState = null;
var temperatureState = null;
var lightState = null;

const app = express();
app.use(express.json());

//Connection to mongodb
connectDB();

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));

db.once("open", function () {
  console.log("Connected successfully");
});

app.get('/dati', (req, res) =>  {
    db.collection(name).find().sort({date:-1}).limit(1).toArray(function(err, result) {
        if (err) throw err;
        res.header("Refresh", "5");
        res.send(result[0]);
    });
});

app.get('/temperature', (req, res) =>  {
  if (req.query.product == undefined) {
    req.query.product = 10;
  }
  db.collection(name).find().limit(parseInt(req.query.product)).sort({date:-1}).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
      console.log(result.length);
  });
  // console.log(req.query.product);
  
});
//Setup connessioni con i device

thingShadows.on('connect', function() {
    thingShadows.register(name, {}, function() {
       thingShadows.get(name);
       //thingShadows.subscribe('esp32/pub');
       thingShadows.subscribe('$aws/things/ESP32_Meteo/shadow/update/documents');
    });
});

thingShadows.on('message', function(topic, payload) {
    if(topic == '$aws/things/' + name + '/shadow/update/documents') {
        var obj = JSON.parse(payload.toString());
        humidityState = obj.current.state.reported.value.humidity;
        temperatureState = obj.current.state.reported.value.temperature;
        lightState = obj.current.state.reported.value.light;
        console.log("new Humidity: " + humidityState  + " new Temperature: " + temperatureState +
          " new Light: " + lightState);
        db
        .collection(name)
        .insertOne({
            humidity: humidityState,
            temperature: temperatureState,
            light: lightState,
            date: new Date()
        })
        .then(result => console.log(result))
        .catch(err => console.error(err));
        
    }else{
      console.log('non ci interessa');
    }
    
  });

thingShadows.on('status',  function(name, stat, clientToken,  stateObject) {
  console.log('received '+stat+' on '+name+': '+ JSON.stringify(stateObject));
  humidityState = stateObject.state.reported.value.humidity;
  temperatureState = stateObject.state.reported.value.temperature;
  lightState = stateObject.state.reported.value.light;
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));