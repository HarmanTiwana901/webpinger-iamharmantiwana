const express = require('express');
const app = express();
const bodyParser = require("body-parser");
var cors = require('cors')
var urlExists = require('url-Exists');
var path = require('path');
var request = require('request');
const { response } = require('express');
const PORT = process.env.PORT || 9000;


app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/checkIfValid', (req, res) => {
    urlExists(req.body.address, (err, exists) => {
        res.json(exists);
        console.log(exists);
    });
    
});

app.post('/additionalDetails', (req, res) => {
    request(req.body.address, (err, resp, body) => {
        res.json(resp);
    });
});

app.listen(PORT, () => {
    console.log(`Listening ${PORT}`);
});