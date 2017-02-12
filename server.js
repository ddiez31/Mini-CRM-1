var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var linkjson = require('./data/crm.json')
var fs = require('fs');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res) {
    res.redirect("/index");
});

app.get('/index', function(req, res) {
    res.sendFile(path.join(__dirname, '/', 'index.html'));
});

app.post('/post', function(req, res) {
    fs.readFile("data/crm.json", 'utf-8', function(err, res) {
        if (err) {
            throw err
        };
        var database = JSON.parse(res);
        var len = database.customers.length;
        var newCustomer = req.body;

        newCustomer.id = len + 1
        database.customers.push(req.body);

        var newDatabase = JSON.stringify(database, null, 2)

        fs.writeFile("data/crm.json", newDatabase, function(err) {
            if (err) {
                throw err
            }
        });
    });
});

app.get('/formulaire', function(req, res) {
    res.sendFile(path.join(__dirname, '/public', 'formulaire.html'));
})

app.get('/data', function(req, res) {
    res.send(linkjson);
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});