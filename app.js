var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));

// schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create({
    name: "Salmon Creek",
    image: "https://images.pexels.com/photos/7758/pexels-photo.jpg?h=350&auto=compress&cs=tinysrgb/"
}, function(err, campground) {
    if (err) {
        console.log(err);
    } else {
        console.log('New campground\n' + campground);
    }
});

app.get('/', function(req, res) {
    res.render('landing');
});

app.get('/campgrounds', function(req, res) {
    // res.render('campgrounds', {
    //     campgrounds: campgrounds
    // });

    // Get all campgrounds from mongodb
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log("error: " + err);
        } else {
            res.render("campgrounds", { campgrounds: allCampgrounds })
        }
    })
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
