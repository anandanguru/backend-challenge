var express = require('express')
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({
    extended: false
}));

console.log("service is running");

app.listen(5001);

app.use('/api', require('./routes/record'));

module.exports = {app: app};

