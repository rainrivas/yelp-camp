var express = require('express');
var app = express();

app.set("view engine", "ejs");

app.get('/', function(req, res) {
    res.send("Hello World");
});

app.listen(3000, function() {
    console.log('server running on port 3000');
});
