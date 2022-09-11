const express = require('express');
const mongoose = require('mongoose');
const IoTClient = require('@aws-sdk/client-iot').IoTClient;
const CreateThingCommand = require('@aws-sdk/client-iot').CreateThingCommand;
const CreateKeysAndCertificateCommand = require('@aws-sdk/client-iot').CreateKeysAndCertificateCommand;
const AttachThingPrincipalCommand = require('@aws-sdk/client-iot').AttachThingPrincipalCommand;
const AttachPolicyCommand = require('@aws-sdk/client-iot').AttachPolicyCommand;
const DeleteThingCommand = require("@aws-sdk/client-iot").DeleteThingCommand;
const DetachPolicyCommand = require("@aws-sdk/client-iot").DetachPolicyCommand;
const DetachThingPrincipalCommand = require("@aws-sdk/client-iot").DetachThingPrincipalCommand;
const UpdateCertificateCommand = require("@aws-sdk/client-iot").UpdateCertificateCommand;
const DeleteCertificateCommand = require("@aws-sdk/client-iot").DeleteCertificateCommand;
const ListThingPrincipalsCommand = require("@aws-sdk/client-iot").ListThingPrincipalsCommand;
const DetachPrincipalPolicyCommand = require("@aws-sdk/client-iot").DetachPrincipalPolicyCommand;
const { IoTDataPlaneClient, UpdateThingShadowCommand, GetThingShadowCommand, PublishCommand } = require("@aws-sdk/client-iot-data-plane");
const awsIot = require('aws-iot-device-sdk');
const connectDB = require('./config/db');
const { query } = require('express');
const secrets = require('./config/secrets.json');
const fs = require('fs');
const { log } = require('console');
const config = {
  region: 'ap-south-1',
  credentials: {
    accessKeyId: secrets.accessKeyId,
    secretAccessKey: secrets.secretAccessKey,
  },
};
const client = new IoTClient(config);
const clientShadows = new IoTDataPlaneClient(config);
const name = 'ESP32_Meteo';
/*const  thingShadows = awsIot.thingShadow({
    keyPath: './devices/esp32/privateKey.key',
    certPath: './devices/esp32/deviceCert.crt',
    caPath: './devices/esp32/AmazonRootCA1.pem',
    clientId: 'Meteo1', //nome policy
    host: 'a8bjo0oi9t9yw-ats.iot.ap-south-1.amazonaws.com', //endpoint dispositivo
})
console.log(thingShadows);

var humidityState = null;
var temperatureState = null;
var lightState = null;
*/
var thingShadows= [];
var thingNames = [];
var currentShadowsNames = [];
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
    // console.log(req.query.thingName)
    // if  req.query.thingName is not undefined
    if (req.query.thingName !== undefined & req.query.thingName !== '') {

    db.collection(req.query.thingName).find().sort({date:-1}).limit(1).toArray(function(err, result) {
        if (err) throw err;
        res.header("Refresh", "5");
        res.send(result[0]);
    });
  }
});

//qui è per la richiesta di creazione di una nuova thing
app.get('/richiesta_info_thing', (req, res) =>  {
  //catch della richiesta di info della thing
  console.log("nome della thing inserita");
  console.log(req.query.thingName);
  try {
    addThing(req.query.thingName);
  } catch (err) {
    console.log("Error", err);
  }
});
//qui è per la richiesta di creazione di una nuova thing
app.get('/richiesta_info_thing_delete', (req, res) =>  {
  //catch della richiesta di info della thing
  console.log("nome della thing inserita");
  console.log(req.query.thingName);
  try {
    deleteThing(req.query.thingName);
    console.log("delete thing initiated");
  } catch (err) {
    console.log("Error", err);
  }
});

//qui è per la richiesta della lista delle things salvate
app.get('/get_lista_things', (req, res) =>  {
      res.header("Refresh", "5");
      const thingNames = [];
      // get all subfolders names in certStorage in an array called things
      const things = fs.readdirSync('./certStorage');
      // for each subfolder in certStorage
      things.forEach((thing) => {
        //atdd the thing name to the array of thing names
        if (thing !== 'GlobalCert') {
          thingNames.push(thing);
        }
      });
      res.send(thingNames);
});


app.get('/temperature', (req, res) =>  {
  if (req.query.product == undefined) {
    req.query.product = 10;
  }
  console.log("Ricevo questi dati");
  console.log(req.query);
  console.log(req.query.thingName)
  if (req.query.thingName !== undefined & req.query.thingName !== '') {
    db.collection(req.query.thingName).find().limit(parseInt(req.query.product)).sort({date:-1}).toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
        console.log(result.length);
    });
  }
  // console.log(req.query.product);
  
});
//Setup connessioni con i device
/*
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
*/
const port = process.env.PORT || 5000;

const addThing = async (thingNamePass) => {
  // parametri per la creazione della thing
  const inputCreateThing = {
    thingName: thingNamePass,
    attributePayload: {
      attributes: {
        key: 'value',
      },
    },
  };
  // creazione della thing
  const commandCreateThing = new CreateThingCommand(inputCreateThing);
  const responseCreateThing = await client.send(commandCreateThing);
  // console.log(responseCreateThing);
  // creazione della chiave e del certificato
  const inputCreateCertAndKeys = {
    setAsActive: true, 
  };
  const commandCreateCertAndKeys = new CreateKeysAndCertificateCommand(inputCreateCertAndKeys);
  const responseCreateCertAndKeys = await client.send(commandCreateCertAndKeys);
  // console.log(responseCreateCertAndKeys);
  // attacco della chiave e del certificato alla thing
  const inputAttachThingPrincipal = {
    thingName: thingNamePass,
    principal: responseCreateCertAndKeys.certificateArn,
  };
  const commandAttachThingPrincipal = new AttachThingPrincipalCommand(inputAttachThingPrincipal);
  const responseAttachThingPrincipal = await client.send(commandAttachThingPrincipal);
  // console.log(responseAttachThingPrincipal);
  // atatcco della policy alla chiave e al certificato
  const inputAttachPolicy = {
    policyName: 'Meteo1',
    target: responseCreateCertAndKeys.certificateArn,
  };
  const commandAttachPolicy = new AttachPolicyCommand(inputAttachPolicy);
  const responseAttachPolicy = await client.send(commandAttachPolicy);
  // console.log(responseAttachPolicy);
  //creo se non esiste la cartella dove salvare i certificati e la chiamo certStorage 
  if (!fs.existsSync('./certStorage')) {
    fs.mkdirSync('./certStorage');
  }
  //creo se non esiste la cartella dove salvare i certificati e la chiamo come il nome della thing all'interno di certStorage
  if (!fs.existsSync('./certStorage/' + thingNamePass)) {
    fs.mkdirSync('./certStorage/' + thingNamePass);
  } 
  //get root ca
  const inputGetRootCA = {
    certificateId: '5f4b9c3b9c9f9b0001b0b1f9',
    certificatePem: true,
  };
  //salvo i certificati nella cartella certStorage in una sottocartella chimata con la thing name
  fs.writeFileSync('./certStorage/' + thingNamePass + '/privateKey.key', responseCreateCertAndKeys.keyPair.PrivateKey);
  fs.writeFileSync('./certStorage/' + thingNamePass + '/certificate.pem.crt', responseCreateCertAndKeys.certificatePem);
  console.log('certificati salvati');
  connectToOneShadow(thingNamePass);
  updateShadowInit(thingNamePass);
  updateShadowForTesting(thingNamePass);
  //console.log(responsePublish);
  

};

const deleteThing = async (thingNamePass) => {
  // Detach policy
  const inputDetachPolicy = {
    policyName: 'Meteo1',
    target: 'arn:aws:iot:ap-south-1:253627424880:cert/' + thingNamePass,
  };

  const commandDetachPolicy = new DetachPolicyCommand(inputDetachPolicy);
  const responseDetachPolicy = await client.send(commandDetachPolicy);
  //console.log(responseDetachPolicy);
  // get list of  thing principals
  const inputGetThingPrincipals = {
    thingName: thingNamePass,
  };

  const commandGetThingPrincipals = new ListThingPrincipalsCommand(inputGetThingPrincipals);
  const responseGetThingPrincipals = await client.send(commandGetThingPrincipals);
  //console.log(responseGetThingPrincipals);
  if (responseGetThingPrincipals.principals.length > 0) {
    
    

  // get last 64 charts of a string to get id of the certificate
  certificateId = responseGetThingPrincipals.principals[0].slice(-64)  


  // update certificate
  const inputUpdateCertificate = {
    certificateId: certificateId,
    newStatus: 'INACTIVE',
  };

  
  const commandUpdateCertificate = new UpdateCertificateCommand(inputUpdateCertificate);
  const responseUpdateCertificate = await client.send(commandUpdateCertificate);
  // Detach thing principal
  const inputDetachThingPrincipal = {
    thingName: thingNamePass,
    principal: responseGetThingPrincipals.principals[0],
  };

  const commandDetachThingPrincipal = new DetachThingPrincipalCommand(inputDetachThingPrincipal);
  const responseDetachThingPrincipal = await client.send(commandDetachThingPrincipal);
  //console.log(responseDetachThingPrincipal);
  //detach policy from certificate
  const inputDetachPolicyFromCertificate = {
    policyName: 'Meteo1',
    target: responseGetThingPrincipals.principals[0],
  };
  const commandDetachPolicyFromCertificate = new DetachPolicyCommand(inputDetachPolicyFromCertificate);
  const responseDetachPolicyFromCertificate = await client.send(commandDetachPolicyFromCertificate);
  //console.log(responseDetachPolicyFromCertificate);
  //delete certificate
  const inputDeleteCertificate = {
    certificateId: certificateId,
  };
  const commandDeleteCertificate = new DeleteCertificateCommand(inputDeleteCertificate);
  const responseDeleteCertificate = await client.send(commandDeleteCertificate);
  //console.log(responseDeleteCertificate);
  }
  // delete thing
  const inputDeleteThing = {
    thingName: thingNamePass,
  };
  const commandDeleteThing = new DeleteThingCommand(inputDeleteThing);
  const responseDeleteThing = await client.send(commandDeleteThing);
  //console.log(responseDeleteThing);
  //rimuovi la cartella della thing

  fs.rmdirSync('./certStorage/' + thingNamePass, { recursive: true });
  console.log("Thing deleted");
  disconnectFromAShadow(thingNamePass);
};


const updateShadowInit = async (thingNamePass) => {
  const config = {
    region: 'ap-south-1',
    credentials: {
      accessKeyId: secrets.accessKeyId,
      secretAccessKey: secrets.secretAccessKey,
    },
  };
  const client = new IoTDataPlaneClient(config);
  // update on thing shadow
  const inputUpdateShadow = {
    thingName: thingNamePass,
    payload: JSON.stringify({
      state: {
        desired: {
          value: {
            humidity: 0,
            temperature: 0,
            light: 0,
          },
        },
      },
    }),
  };
  const commandUpdateShadow = new UpdateThingShadowCommand(inputUpdateShadow);
  const responseUpdateShadow = await client.send(commandUpdateShadow);
  console.log("Shadow inizializzata");
};

const updateShadowForTesting= async (thingNamePass) => {
  const config = {
    region: 'ap-south-1',
    credentials: {
      accessKeyId: secrets.accessKeyId,
      secretAccessKey: secrets.secretAccessKey,
    },
  };
  const client = new IoTDataPlaneClient(config);
  // publish on thing shadow con PublishCommand
  const inputPublish = {
    topic: '$aws/things/' + thingNamePass + '/shadow/update',
    payload: JSON.stringify({
      state: {
        desired: {
          value: {
            humidity: 11,
            temperature: 11,
            light: 11,
          },
        },
      },
    }),
  };
  const commandPublish = new PublishCommand(inputPublish);
  const responsePublish = await client.send(commandPublish);
  console.log("Shadow aggiornata");
};

const connectToAllShadows =  () => {
  thingNames = [];
  // get all subfolders names in certStorage in an array called things
  const things = fs.readdirSync('./certStorage');
  // for each subfolder in certStorage
  things.forEach((thing) => {
    //atdd the thing name to the array of thing names
    if (thing !== 'GlobalCert') {
      thingNames.push(thing);
    }
  });
  console.log(thingNames);  
  console.log(thingNames.length);
  
  //declare array of atwIot.thingShadow of size 
  //atwIot.thingShadow is a class that allows to connect to a thing shadow
  //the array will contain all the thing shadows
  //connect to all the thing shadows
  for (let i = 0; i < thingNames.length; i++) {
    thingShadows[i] = new awsIot.thingShadow({
      keyPath: './certStorage/' + thingNames[i] + '/privateKey.key',
      certPath: './certStorage/' + thingNames[i] + '/certificate.pem.crt',
      caPath: './certStorage/GlobalCert/AmazonRootCA1.pem',
      clientId: thingNames[i],
      host: 'a8bjo0oi9t9yw-ats.iot.ap-south-1.amazonaws.com',
    });
    thingShadows[i].on('connect', function() {
      thingShadows[i].register(thingNames[i], {}, function () {
        console.log('registered to thing shadow ' + thingNames[i]);
        thingShadows[i].subscribe('$aws/things/'+thingNames[i]+'/shadow/update/documents');
        });
      });
    //do for the on message
    thingShadows[i].on('message', function (topic, payload) {
      if(topic == '$aws/things/' + thingNames[i] + '/shadow/update/documents') {
        //console.log(JSON.parse(payload.toString()));
        var obj = JSON.parse(payload.toString());
        humidityState = obj.state.reported.value.humidity;
        temperatureState = obj.state.reported.value.temperature;
        lightState = obj.state.reported.value.light;
        console.log("new Humidity: " + humidityState  + " new Temperature: " + temperatureState +
          " new Light: " + lightState);
        db
        .collection(thingNames[i])
        .insertOne({
            humidity: humidityState,
            temperature: temperatureState,
            light: lightState,
            date: new Date()
        })
        .then(result => console.log(result))
        .catch(err => console.error(err));
        
    }else{
      //console.log('non ci interessa');
    }
    
    });
    //read
  }

  // print content of thingShadows
  currentShadowsNames = thingNames;
  
  
};

const connectToOneShadow = (thingName) => {
  thingShadowC = new awsIot.thingShadow({
    keyPath: './certStorage/' + thingName + '/privateKey.key',
    certPath: './certStorage/' + thingName + '/certificate.pem.crt',
    caPath: './certStorage/GlobalCert/AmazonRootCA1.pem',
    clientId: thingName,
    host: 'a8bjo0oi9t9yw-ats.iot.ap-south-1.amazonaws.com',
  });
  thingShadowC.on('connect', function() {
    thingShadowC.register(thingName, {}, function () {
      console.log('registered to thing shadow ' + thingName);
      thingShadowC.subscribe('$aws/things/'+thingName+'/shadow/update/documents');
      });
    });
  //do for the on message
  thingShadowC.on('message', function (topic, payload) {
    if(topic == '$aws/things/' + thingName + '/shadow/update/documents') {
      //console.log(JSON.parse(payload.toString()));
      var obj = JSON.parse(payload.toString());
      humidityState = obj.state.reported.value.humidity;
      temperatureState = obj.state.reported.value.temperature;
      lightState = obj.state.reported.value.light;
      console.log("new Humidity: " + humidityState  + " new Temperature: " + temperatureState +
        " new Light: " + lightState);
      db
      .collection(thingName)
      .insertOne({
          humidity: humidityState,
          temperature: temperatureState,
          light: lightState,
          date: new Date()
      })
      .then(result => console.log(result))
      .catch(err => console.error(err));
      
  }else{
    //console.log('non ci interessa');
  }
  
  });
  //push to thingShadows
  thingShadows.push(thingShadowC);
  currentShadowsNames.push(thingName);
}

const disconnectFromAShadow = (thingName) => {
  //pop element from thingShadows given index
  //console.log("Vecchio array: " + currentShadowsNames);
  //console.log(currentShadowsNames.length+" ", thingShadows.length)
  //unregister from thing shadow
  thingShadows[currentShadowsNames.indexOf(thingName)].unregister(thingName);
  thingShadows.splice(currentShadowsNames.indexOf(thingName),1)
  currentShadowsNames.splice(currentShadowsNames.indexOf(thingName),1)
  //console.log("Nuovo array: " + currentShadowsNames);
  //console.log(currentShadowsNames.length+" ", thingShadows.length)
}
connectToAllShadows();
  


app.listen(port, () => console.log(`Server running on port ${port}`));