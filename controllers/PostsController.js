const PostModel = require('../models/PostModel.js');

module.exports = {

  //Gets a list of resources
  list(req, res, next) {
    PostModel.find((err, posts) => {
      res.render('posts', { posts });
    }); //end of PostModel.find
  },

  //Creates a new resource
  new(req, res, next) {
    res.render('post_form');
  },
  create(req, res, next) {
    const user = req.body.user;
    const text = req.body.text;
    const updated = updated;
    const model = new PostModel({ user, text, updated });

    model.save((err, post) => {
     console.log('Error: ', err)
     res.redirect('/posts');
     //res.json(model);
   });
 },

 //Updates a resource
 edit(req, res, next) {
   PostModel.findOne({ _id: req.params.id }, (err, post) => {
     res.render('post_edit', { post });
   });
 },
 update(req, res, next) {
   PostModel.findOne({ _id: req.params.id }, (err, post) => {
     if (err) {
       return next(err);
     }
     post.user = req.body.user;
     post.text = req.body.text;
     post.updated = new Date();
     post.save((err, post) => {
       res.redirect('/posts');
     });
   });
 },

 //Deletes a resource
 remove(req, res, next) {
   PostModel.findByIdAndRemove({ _id: req.params.id }, (err, post) => {
     if (err) {
       return next(err);
     }
     res.redirect('/posts');
   });
 }

}//end of module.exports
