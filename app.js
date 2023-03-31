//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

// setting 'ejs' as templating engine
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

// using public directory to store static files such as images and css code
app.use(express.static("public"));



mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const articleSchema = {
    title: String,
    content: String
}

const Article = mongoose.model("Article", articleSchema);



app.get("/articles", function(req,res){
Article.find({}).then(foundArticles => {
  res.send(foundArticles);
}).catch(err => console.log(err));

;})

//post-request targets the 'articles' route, then creates a 'newArticle' 
app.post("/articles", async (req, res) => {
  const newArticle = new Article ({
      title: req.body.title,
      content: req.body.content
  })
  newArticle.save().then(success => {  //send it to the client when success
      res.send("Succesfully added a new article");
  }).catch(err => { //catch error and send it
      res.send(err);
  })
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});




