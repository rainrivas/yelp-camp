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

// commenting this create out so we don't recreate this same campground everytime we launch or server
/*
Campground.create({
    name: "Salmon Creek",
    image: "https://images.pexels.com/photos/7758/pexels-photo.jpg?h=350&auto=compress&cs=tinysrgb/",
    description: "This is a gorgeous description"
}, function(err, campground) {
    if (err) {
        console.log(err);
    } else {
        console.log('New campground\n' + campground);
    }
});
*/

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
            res.render("index", {
                campgrounds: allCampgrounds
            });
        }
    });
});

app.post("/campgrounds", function(req, res) {
    // get data from form and add to campgrounds array
    // add it to our final list of campsites
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {
        name: name,
        image: image
    };
    // create new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log("we've hit an error: " + err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", function(req, res) {
    res.render('new');
});

app.get("/campgrounds/:id",function(req,res){
    res.send("show");
});

app.listen(3000, function() {
    console.log('server running on port 3000');
});