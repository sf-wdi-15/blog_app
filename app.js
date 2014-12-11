var express = require("express"),
  bodyParser = require("body-parser"),
  db = require("./models"),
  app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req,res) {
  db.author.findAll().success(function(authors){
    res.render('authors/index.ejs', {authorsList: authors});
  });
});

app.get('/authors', function (req,res) {
  db.author.findAll().success(function(authors){
    // authorsList refers to index.ejs 
    res.render('authors/index.ejs', {authorsList: authors});
  });
});

// app.post('/authors', function (req, res){
//    db.blog_app
// }

app.get('/authors/new', function (req,res) {
  res.render('authors/new.ejs');
});

app.get('/authors/:id', function (req,res) {
                  //url parameters 
  var authorId = req.params.id;
  db.author.find(authorId).success(function(foundAuthor) {
    res.render('authors/show.ejs', {authorToShow: foundAuthor});
  });
});

app.post("/authors", function (req, res){
                  //coming from body in html, grabbing value of form inputs
  var newAuthor = req.body.author;
  db.author.create(newAuthor).success(function(createdAuthor){
    res.redirect('/authors/' + createdAuthor.id);
  });
});  

app.get('/posts/new', function (req,res) {
  res.render('posts/new.ejs');
});

app.get('/posts/show/:id', function (req,res) {
  res.render('posts/new.ejs');
});

app.get("/authors/:id", function (req, res) {
  var id = req.params.id;
  db.user.find(id)
    .then(function (user) {
      res.render("authors/show", {user: user});
    })
   
});






















db.sequelize.sync().then(function() {
  var server = app.listen(3000, function() {
    console.log(new Array(51).join("*"));
    console.log("\t LISTENING ON: \n\t\t localhost:3000");
    console.log(new Array(51).join("*")); 
  });
});
