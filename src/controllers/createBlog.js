const multer = require('multer');
const Blog = require('../schema/blogSchema');
const path = require('path');

// Setup multer for file uploads (save files locally for simplicity)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // specify where to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // ensure unique file names
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/; // Allow only image files
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true); // Allow file
    }
    cb(new Error('Only image files are allowed'));
  }
}).single('image'); // "image" is the field name for the uploaded file

// Create blog post handler
const createBlog = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    
    try {
      const { title, content, categories, tags } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Save the image URL

      // Create new blog post
      const blog = new Blog({
        title,
        content,
        author: req.user._id, // Use authenticated user ID
        categories,
        tags,
        imageUrl // Store the image URL
      });

      await blog.save();
      return res.status(201).json({ message: 'Blog created successfully', blog });
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  });
};

module.exports = { createBlog };
