var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
//create a db if not already present.
mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: true }));
//schema setup
var campgroundSchema = new mongoose.Schema({
    name:String,
    image:String,
    description:String
});
//model declaration
var Campground = mongoose.model("Campground", campgroundSchema);
// var campgrounds = [
//     {name:"Goat Hill", image:"https://www.photosforclass.com/download/pixabay-1846142?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c72297add934dc45c_960.jpg&user=Pexels"},
//     {name:"Salmon creek",image:"https://www.photosforclass.com/download/pixabay-4303359?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c72297add934dc45c_960.jpg&user=chanwity"},
//     {name:"cave of snow",image:"https://www.photosforclass.com/download/pixabay-1851092?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c72297add934dc45c_960.jpg&user=Pexels"}
//     ];
app.get("/",(req,res)=>{
// res.send("welcome to yelp home page!");
res.render("landing");
});
app.get("/campgrounds", (req,res)=>{
    Campground.find({},function(err, allcampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds",{campgrounds:allcampgrounds});
        }
    });
    
});

app.post("/campgrounds", (req,res)=>{
    // res.send("you hit the post route!");
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCamp = {name:name,image:image,description:desc};
    Campground.create(newCamp, function(err, newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            console.log("Newly created entry in DB:");
            console.log(newlyCreated);
        }
    });
    // campgrounds.push(newCamp);
    res.redirect("/campgrounds");


});

app.get("/campgrounds/new", (req,res)=>{
    res.render("new");
});
app.get("/campgrounds/:id",(req,res)=>{
    var id = req.params.id;
    Campground.findById(id, function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("show",{data:foundCampground});
        }

    });

    
    
});

app.listen(8000, ()=>{

console.log("Server started...");

});