const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const authMiddleware = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});


router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    content=content.replace(/<\/?[^>]+(>|$)/g, '') ;
    console.log(content)
    
    const post = new Post({ title, content });
    await post.save();
    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});


module.exports = router;
