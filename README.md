#Blog Lab
## Setup And Install

## Init

We need a `package.json` to get started. Do an `npm init`. Now we install the following:

* `npm install --save express ejs body-parser` for the express related items
* `npm install --save pg sequelize` for the model related modules

## Migration Setup

We need to create our database and configure sequelize before we get setup.

* Init your sequelize
  
  ```
  sequelize init
  ```

* Update your `config.json`
  
  ```
  ...
    development: {
      database: 'blog_app', // the name of your db
      host: '127.0.0.1',
      dialect: 'postgres' // the dialect of SQL being used
     },
  ...
  ```
* Create your database

  ```
  $ createdb blog_app
  ```
* Create our models for our application

  ```
  sequelize model:create --name 'author' --attributes 'firstName:string, lastName:string, age:integer'
  sequelize model:create --name 'post'  --attributes 'title:string, content:text'
  ```
  * The above `model:create` makes a few files for us. The `models/author.js` and `models/post.js` are the js the js models built by sequelize to interact with the `authors` and `posts` table respectively. You might be wondering how the `authors` and `posts` table will be created, but all this will be done by the `migrations/author.js` and `migrations/post.js` files when we run `sequelize db:migrate`. Your migrations are just the instructions that will tell your database to create tables, add/remove columns from tables, et cetera. Your models are what sequelize will use to query your database tables.
* Run your migrations to create your `author` and `post` tables. 
  
  ```
  sequelize db:migrate
  ```

* **FORIEGN KEY**: a foriegn key is a reference needed by one row to look up an associated row in another table that it said to belong to. For example, see the following:

  * Authors

	  | id | firstName| lastName | age |
	  | :--- | :--- | :--- | :--- |
	  | serial primary key | `varchar(255)` | `varchar(255)` | integer|
	  | 1 | jane | doe | 21 |
	  | 2 | john | doe | 22 |
	  | 3 | ruby | doe | 35 |

  * Posts
	
	  | id | title | content | author_id |
	  | :--- | :--- | :--- | :--- |
	  | serial primary key | `varchar(255)` | text | integer |
	  | 1 | A Post About Jane | Blah blah ... blah | 1 |
	  | 2 | Another Post About Jane | Yo yo yo | 1 |
	  | 3 | All About Ruby | Go Ruby! | 3 |
	  | 4 | Quite The Gem | A community of devs | 3 |
	  | 5 | Something About Jane | Coffee shop memories... | 1|
	  | 6 | About John | The truth is... | 2|

  * In this example the foreign key is in the `Posts` table, `author_id`, because each row in the `Posts` table is said to **belong to** an author. In the above example we can spot that the author *Jane* with `id=1` has three posts because there are three rows in the `Posts` table that have `author_id=1`.
    * How many posts does `Ruby` have?
    * How many posts does `John` have?

* **Be sure to migrate your database if you haven't already...**
* You might have noticed that we haven't added any foriegn key to our `Posts` table. We need an `author_id`. Ealier we mentioned that migrations can be used to also **add/remove** columns from a table, but we just have to be sure that these tables already exist. **You won't be able to add a column to a table that doesn't exist**, so make sure your tables from the above `model:create` statement are migrated already. 
* Let's generate a migration to update our `Posts` to have an `author_id`.

	```
	sequelize migration:create --name add_author_id_to_posts
	```
	
	will create an **empty** migration file that we will have to **update**. The only reason we used this command is because it generates a timestamp with the name of the file, so that we can run our migrations in a particular order

* The following is the text that is in the migration folder we created.

	```
	
	"use strict";
	
	module.exports = {
	  up: function(migration, DataTypes, done) {
	    // add altering commands here, calling 'done' when finished
	    done();
	    },
	 down: function(migration, DataTypes, done) {
	    // add reverting commands here, calling 'done' when finished
	    done();
	    }
	};
	
	```

* We have to edit this file to reflect the changes we want to make.


```
	
	"use strict";
	
	module.exports = {
	  up: function(migration, DataTypes, done) {
	    // add altering commands here, calling 'done' when finished
	    migration.addColumn("posts", "authorId", {
	      type: DataTypes.INTEGER
	    }).done(done)
	    },
	  down: function(migration, DataTypes, done) {
	    // add reverting commands here, calling 'done' when finished
	    migration.removeColumn("posts", "authorId").done(done);
	 }
	};
	
```

* Let's then run  this migration

```
sequelize db:migrate
```
* Our database is now all properly setup.