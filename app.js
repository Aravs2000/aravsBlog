//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to Aravs blog, Here you can see about me, my business and my services. You can feel free to express your thoughts through the contacts.. Reviews on my Web Archives are welcomed";
const aboutContent = "Am Aravs, An aspiring web developer.Interested in reactJs and expressJs.View some of my projects in Aravs2000(github-id)";
const contactContent = "Contact me sekararavind5@gmail.com, Say hi to me in Aravind20002000--twitter ";
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let postList = [];
app.get("/", function(req, res) {
    res.render("home", {
        homeText: homeStartingContent,
        postList: postList
    });
});

app.get("/about", function(req, res) {
    res.render("about", {
        aboutText: aboutContent
    });
});

app.get("/compose", function(req, res) {
    res.render("compose");
});


app.post("/compose", function(req, res) {
    var post = {
        title: req.body.titleContent,
        content: req.body.publishContent
    };
    postList.push(post);
    res.redirect("/");
});



app.get("/contact", function(req, res) {
    res.render("contact", {
        contactText: contactContent
    });

});


app.get("/posts/:postName", function(req, res) {
    const requestedTitle = req.params.postName.toLowerCase();

    postList.forEach(function(post) {
        if (_.lowerCase(post.title) === requestedTitle) {
            console.log("match found");
            res.render("post", {
                title: post.title,
                content: post.content
            });
        }
    });
});




app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000");
});