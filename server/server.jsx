const express = require('express');
const awsIot = require('aws-iot-device-sdk');

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

//Setup connessioni con i device

thingShadows.on('connect', function() {
    thingShadows.register(name, {}, function() {
       thingShadows.get(name);
       //thingShadows.subscribe('esp32/pub');
       thingShadows.subscribe('$aws/things/ESP32_Meteo/shadow/update/documents');
    });
});

thingShadows.on('message', function(topic, payload) {
    //console.log('message', topic, payload.toString());
    if(topic == '$aws/things/' + name + '/shadow/update/documents') {
        //console.log(payload.toString());
        var obj = JSON.parse(payload.toString());
        humidityState = obj.current.state.reported.value.humidity;
        temperatureState = obj.current.state.reported.value.temperature;
        lightState = obj.current.state.reported.value.light;
        console.log("new Humidity: " + humidityState  + " new Temperature: " + temperatureState +
          " new Light: " + lightState);
        /*db
        .collection(name)
        .insertOne({
            humidity: humidityState,
            temperature: temperatureState,
            light: lightState,
            date: new Date()
        })
        .then(result => console.log(result))
        .catch(err => console.error(err));
        */
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