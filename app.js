var express = require("express"),
  bodyParser = require("body-parser"),
  db = require("./models"),
  app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.render("site/home");
});

app.get("/authors", function (req, res) {
  db.author.findAll().then(function (authors) {
    res.render("authors/index", {authors: authors});
  });
});

app.get("/authors/:id", function (req, res) {
  db.author.find({
    where: {
      id: req.params.id
    }, 
    include: [db.post]
  }).then(function (author) {
    res.render("authors/show", {author: author})
  });
});

app.get("/authors/:author_id/posts/new", function (req, res) {
  db.author.find(req.params.author_id)
    .then(function (author) {
      res.render("posts/new", {author: author});
    },
    function () {
      res.redirect("/authors");
    });
});

app.post("/authors/:author_id/posts", function (req, res) {
  var authorId = req.params.author_id;
  db.author.find(authorId)
    .then(function (author) {
      db.post.create({
        title: req.body.post.title,
        content: req.body.post.content,
        authorId: authorId
      })
        .then(function (post) {
          res.redirect("/authors/" + authorId + "/posts/" + post.id );
        });
    });
});

app.get("/authors/:author_id/posts/:id", function (req, res) {
  var authorId = req.params.author_id;
  var postId = req.params.id;
  db.post.find({
    where: {
      authorId: authorId,
      id: postId
    },
    include: [db.author]
  }).then(function (post) {
      res.render("posts/show", {post: post});
  })
});


app.listen(3000)

