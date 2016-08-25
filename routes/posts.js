const express = require('express');
const router = express.Router();
const PostModel = require('../models/PostModel.js');
const PostsController = require('../controllers/PostsController');

//Get a list of resources
router.get('/', PostsController.list);

//Create a new resource
router.get('/new', PostsController.new);
router.post('/', PostsController.create);

//Update a resource
router.get('/:id/edit', PostsController.edit);
router.put('/:id', PostsController.update);

//Delete a resource
router.delete('/:id', PostsController.remove);

module.exports = router;
