var express = require('express');
var app = express();

app.set("view engine", "ejs");

app.get('/', function(req, res) {
    res.render('landing');
});

app.get('/campgrounds', function(req, res) {
    var campgrounds = [{
        name: "Salmon Creek",
        image: "https://images.pexels.com/photos/7758/pexels-photo.jpg?h=350&auto=compress&cs=tinysrgb/"
    }, {
        name: "Joshua Tree",
        image: "https://images.pexels.com/photos/128956/pexels-photo-128956.jpeg?h=350&auto=compress&cs=tinysrgb"
    }, {
        name: "Estes Park",
        image: "https://images.pexels.com/photos/167701/pexels-photo-167701.jpeg?h=350&auto=compress&cs=tinysrgb"
    }];
    res.render('campgrounds', { campgrounds: campgrounds });

})

app.listen(3000, function() {
    console.log('server running on port 3000');
});
