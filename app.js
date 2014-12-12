var express        = require('express'),
    bodyParser     = require('body-parser'),
    db             = require('./models'),
    methodOverride = require('method-override'),
    app            = express();


app.use( express.static(__dirname + '/public') );
app.use( bodyParser.urlencoded ({ extended : true }) ),
app.set( 'view engine', 'ejs');
app.use( methodOverride('_method'));

/*******************************************************************************
 *******************************************************************************
 **
 ** SITE ROUTES
 **
 *******************************************************************************
*******************************************************************************/

app.get('/', function (req, res) {
  res.render('site/home');
});

app.get('/about', function (req, res) {
  res.render('site/about');
});

app.get('/contact', function (req, res) {
  res.render('site/contact');
});

/*******************************************************************************
 *******************************************************************************
 **
 ** AUTHOR ROUTES
 **
 *******************************************************************************
*******************************************************************************/

//when a user wants to create a new author
app.get('/authors/new',  function (req, res) {
    res.render ('authors/new');
});

//when form is submitted to create an author in db
app.post('/authors', function (req, res) {
    db.author
      .create({
               firstName: req.body.author.firstName,
               lastName : req.body.author.lastName,
               age      : req.body.author.age
      })
      .then( function () {
        res.render('site/home');
      })
      .catch(function (err) { 
              console.log(err);
      });
});

// when a user wants to see a particular author's page
app.get('/authors/:id', function (req, res) {
  var id = req.params.id;
  db.author
    .find({
      where   : { id : id },
      include : [ db.post ]
    })
    .then( function (foundAuthor) {
      console.log({ author : foundAuthor });
      res.render ('authors/show', { author : foundAuthor });
    })
    .catch( function(err) {
      console.log(err);
    });
});

// when a user wants to see a list of all authors
app.get('/authors', function (req, res) {
 db.author
   .findAll()
   .then( function (authors) {
     console.log(authors);
     res.render('authors/index', { authorsList: authors });
   })
   .catch (function (err) {
     console.log(err);
   });
});

app.delete('/authors/:id', function (req, res) {
  db.author
    .find( req.params.id )
    .then( function (foundAuthor) {
      foundAuthor.destroy()
            .then( function () {
              console.log('Author deleted successfully');
              res.redirect('/');
            })
    })
    .catch( function (err) {
      console.log(err);
    });
});


/*******************************************************************************
 *******************************************************************************
 **
 ** POST ROUTES
 **
 *******************************************************************************
*******************************************************************************/

// when an author wants to write a new post
app.get('/authors/:author_id/posts/new', function (req, res) {
  var authorId = req.params.author_id;
  res.render('posts/new', { authorId: authorId });
});

// when author submits the new post form
app.post('/authors/:author_id/posts', function (req, res) {
  var authorId = req.params.author_id;
  db.post.create({
                  title    : req.body.post.title,
                  content  : req.body.post.content,
                  authorId : authorId
          })
          .then( function (post) {
            res.redirect('/authors/' + authorId + '/posts/' + post.id);
          })
          .catch(function (err) {
            console.log(err);
          });
});

// when a user wants to see a list of all posts by an author
app.get('/authors/:author_id/posts/:id', function (req, res) {
  var authorId = req.params.author_id;
  var id = req.params.id;

  db.post
    .find({
           where   : { id : id },
           include : [ db.author ]
    })
    .then(function(foundPost){
      if (foundPost.authorId === parseInt(authorId)){
        res.render('posts/show', {post: foundPost});
      } 
      else {
          res.redirect('/authors/' + authorId);
      }
    })
    .catch(function(err){
      console.log(err);
    });
});


/*******************************************************************************
 *******************************************************************************
 **
 ** DB SYNC THEN START SERVER
 **
 *******************************************************************************
*******************************************************************************/
db.sequelize.sync().then( function () {
  var server = app.listen (3000, function () {
    console.log ( new Array (50).join("*") );
    console.log ( "\t listening \n\t\t localhost:3000" );
    console.log ( new Array (50).join("*") );
  });
});



// GET /authors/:id show a particular author and the titles of their blogs.


// GET /authors/new an author creation form
// POST /authors to create the author
// GET /authors/:author_id/posts/new is a form for a particular book
// POST /authors/:author_id/posts is route that creates a book for the author.

// GET /authors/:author_id/posts/:id to show a particular blog
