// routes/blogRoutes.js
const express = require('express');
const createBlog = require('../controllers/createBlog'); 
const updateBlog = require('../controllers/updateBlog');
const deleteBlog = require('../controllers/deleteBlog');
const { authenticateUser } = require('../middleware/authMiddleware');

const router = express.Router();

// Route for creating a blog post
router.post('/blogs', authenticateUser, createBlog);

// Route for updating a blog post
router.put('/blogs/:blogId', authenticateUser, updateBlog);

// Route for deleting a blog post
router.delete('/blogs/:blogId', authenticateUser, deleteBlog);

module.exports = router;
