var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));

var campgrounds = [{
    name: "Salmon Creek",
    image: "https://images.pexels.com/photos/7758/pexels-photo.jpg?h=350&auto=compress&cs=tinysrgb/"
}, {
    name: "Joshua Tree",
    image: "https://images.pexels.com/photos/128956/pexels-photo-128956.jpeg?h=350&auto=compress&cs=tinysrgb"
}, {
    name: "Estes Park",
    image: "https://images.pexels.com/photos/167701/pexels-photo-167701.jpeg?h=350&auto=compress&cs=tinysrgb"
}, {
    name: "Salmon Creek",
    image: "https://images.pexels.com/photos/7758/pexels-photo.jpg?h=350&auto=compress&cs=tinysrgb/"
}, {
    name: "Joshua Tree",
    image: "https://images.pexels.com/photos/128956/pexels-photo-128956.jpeg?h=350&auto=compress&cs=tinysrgb"
}, {
    name: "Estes Park",
    image: "https://images.pexels.com/photos/167701/pexels-photo-167701.jpeg?h=350&auto=compress&cs=tinysrgb"
}, {
    name: "Salmon Creek",
    image: "https://images.pexels.com/photos/7758/pexels-photo.jpg?h=350&auto=compress&cs=tinysrgb/"
}, {
    name: "Joshua Tree",
    image: "https://images.pexels.com/photos/128956/pexels-photo-128956.jpeg?h=350&auto=compress&cs=tinysrgb"
}, {
    name: "Estes Park",
    image: "https://images.pexels.com/photos/167701/pexels-photo-167701.jpeg?h=350&auto=compress&cs=tinysrgb"
}, {
    name: "Salmon Creek",
    image: "https://images.pexels.com/photos/7758/pexels-photo.jpg?h=350&auto=compress&cs=tinysrgb/"
}, {
    name: "Joshua Tree",
    image: "https://images.pexels.com/photos/128956/pexels-photo-128956.jpeg?h=350&auto=compress&cs=tinysrgb"
}, {
    name: "Estes Park",
    image: "https://images.pexels.com/photos/167701/pexels-photo-167701.jpeg?h=350&auto=compress&cs=tinysrgb"
}, {
    name: "Salmon Creek",
    image: "https://images.pexels.com/photos/7758/pexels-photo.jpg?h=350&auto=compress&cs=tinysrgb/"
}, {
    name: "Joshua Tree",
    image: "https://images.pexels.com/photos/128956/pexels-photo-128956.jpeg?h=350&auto=compress&cs=tinysrgb"
}, {
    name: "Estes Park",
    image: "https://images.pexels.com/photos/167701/pexels-photo-167701.jpeg?h=350&auto=compress&cs=tinysrgb"
}];

app.get('/', function(req, res) {
    res.render('landing');
});

app.get('/campgrounds', function(req, res) {
    res.render('campgrounds', { campgrounds: campgrounds });
})

app.post("/campgrounds", function(req, res) {
    // get data from form and add to campgrounds array
    // add it to our final list of campsites
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {
        name: name,
        image: image
    };
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
})

app.get("/campgrounds/new", function(req, res) {
    res.render('new');
})

app.listen(3000, function() {
    console.log('server running on port 3000');
});
