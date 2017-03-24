var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDb = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));

seedDb();

app.get('/', function(req, res) {
    res.render('landing');
});

// INDEX ROUTE
app.get('/campgrounds', function(req, res) {
    // res.render('campgrounds', {
    //     campgrounds: campgrounds
    // });

    // Get all campgrounds from mongodb
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log("error: " + err);
        } else {
            res.render("campgrounds/index", {
                campgrounds: allCampgrounds
            });
        }
    });
});

// CREATE ROUTE
app.post("/campgrounds", function(req, res) {
    // get data from form and add to campgrounds array
    // add it to our final list of campsites
    var name = req.body.name,
        image = req.body.image,
        desc = req.body.description;
    var newCampground = {
        name: name,
        image: image,
        description: desc
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

// NEW ROUTE
app.get("/campgrounds/new", function(req, res) {
    res.render('campgrounds/new');
});

// SHOW ROUTE
app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log("error: " + err);
        } else {
            // console.log(foundCampground);
            res.render("campgrounds/show", {
                campground: foundCampground
            });
        }
    });
});

/////////////////////
// COMMENTS ROUTES
/////////////////////

app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log('error: ' + err);
        } else {
            res.render("comments/new", { campground: campground });
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res) {
    // look up campgroudn using id
    // create new comments
    // connect new content to campground
    // redirect campground show page
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log('error: ' + err);
            res.redirect("/campgrounds"); // not the best way to handle this, but good 'nuff for now
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log("error: " + err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

app.listen(3000, function() {
    console.log('server running on port 3000');
});
