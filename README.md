# Blog Lab
## Model Relationship Setup


If you haven't been to the other branches yet you'll want to read the following:

* `setup`
* `foriegn-key`

## A Has Many Relationship


We want to be able to tell our application that each author *hasMany* posts, and to do this we added the `authorId` column to the posts table. Now we need to inform our author model of this by using the associate keyword in the model.

`models/author.js`

```
	associate: function (models) {
		this.haMany(models.post);
	}

```

and now we have to inform our post models that they belong to an author.


`models/post.js`

```
	associate: function (models) {
		this.belongsTo(models.author);
	}
```