var express = require("express");
var app = express();
var bodyParser = require('body-parser')
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: true }));
var campgrounds = [
    {name:"Goat Hill", image:"https://www.photosforclass.com/download/pixabay-1846142?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c72297add934dc45c_960.jpg&user=Pexels"},
    {name:"Salmon creek",image:"https://www.photosforclass.com/download/pixabay-4303359?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c72297add934dc45c_960.jpg&user=chanwity"},
    {name:"cave of snow",image:"https://www.photosforclass.com/download/pixabay-1851092?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c72297add934dc45c_960.jpg&user=Pexels"}
    ];
app.get("/",(req,res)=>{
// res.send("welcome to yelp home page!");
res.render("landing");
});
app.get("/campgrounds", (req,res)=>{
    
    res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds", (req,res)=>{
    // res.send("you hit the post route!");
    var name = req.body.name;
    var image = req.body.image;
    var newCamp = {name:name,image:image};
    campgrounds.push(newCamp);
    res.redirect("/campgrounds");


});

app.get("/campgrounds/new", (req,res)=>{
    res.render("new");
});

app.listen(8000, ()=>{

console.log("Server started...");

});