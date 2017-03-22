var mongose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [{
    name: "Salmon Creek",
    image: "https://images.pexels.com/photos/7758/pexels-photo.jpg?h=350&auto=compress&cs=tinysrgb/",
    description: "Something smells fishy"
}, {
    name: "Joshua Tree",
    image: "https://images.pexels.com/photos/128956/pexels-photo-128956.jpeg?h=350&auto=compress&cs=tinysrgb",
    description: "Oh such a pretty place, such a pretty face"
}, {
    name: "Estes Park",
    image: "https://images.pexels.com/photos/167701/pexels-photo-167701.jpeg?h=350&auto=compress&cs=tinysrgb",
    description: "'This Park', like pretty much"
}, {
    name: "JellyStone",
    image: "https://c1.staticflickr.com/6/5602/15623526747_c1d18be192_k.jpg",
    description: "Lit AF"
}, {
    name: "Wet Rock",
    image: "https://media-cdn.tripadvisor.com/media/photo-s/05/c6/94/80/red-squirrel-campsite.jpg",
    description: "Oh so wet"
}];

function seedDb() {
    // wipe all campgrounds
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("removed campgrounds");
            // add a few simple campgrounds AFTER the callback of removing is completed
            data.forEach(function(seed) {
                Campground.create(seed, function(err, campground) {
                    if (err) {
                        console.log("error: " + err)
                    } else {
                        console.log("campground created");
                        // create comment(s)
                        Comment.create({
                            text: "This place is awesome",
                            author: "Emmet, the Lego Guy"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created new comment");
                            }
                        });
                    }
                });
            });
        }
    });
}

module.exports = seedDb;
