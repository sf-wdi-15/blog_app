#Blog Lab

In this lab we will be making a simple blog platform. In many ways this app will be similar to the Daily Planet app. Feel free to modify it if you wish. It might be helpful to start from scratch.

##Objective

* User should be able to go to a form, and fill out a blog post containing `post` and `author`.
* When storing the `post` use a `1 to many relationship` between author and blog post.
* Have a route to only display the blog post by 1 author. Use a url like `/authors/5`

##How to get started

1. `npm init` your project folder. And create the necessary folders for your project. Install `express`, `ejs`, `body-parser`.
2. Install `pg` and `sequelize` 
4. run `sequelize init` 
5. Create the models `Author` and `Post` that will eventually be talking to each other.

	```
	sequelize model:create --name author --attributes 'firstName:string, lastName:string, age:integer'
	```
	and the author
	
	```
	sequelize model:create --name post --attributes 'title:string, content:text'
```
6. Setup the model relationships in the `associate` function in your model files.

## Setup Routing and Views

* `GET` `/authors/new` an author creation form
* `POST` `/authors` to create the author
* `GET` `/authors` shows all the authors
* `GET` `/authors/:id` show a particular author and the titles of their blogs.
* `GET` `/authors/:author_id/posts/new` is a form for a particular book
* `POST` `/authors/:author_id/posts` is route that creates a book for the author.
* `GET` `/authors/:author_id/posts/:id` to show a particular blog




##Bonus

* Feel free to add `edit` and `delete` functionality.
* `DELETE /authors/:author_id/posts/:id` to delete