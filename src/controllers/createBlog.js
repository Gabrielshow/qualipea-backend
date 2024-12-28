import Blog from '../schema/Blog';

export const createBlog = async (req, res) => {
    try {
        const { title, content, categories, tags } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        // Create a new blog post
        const newBlog = new Blog({
            title,
            content,
            author: req.user._id, 
            categories: categories || [],
            tags: tags || []
        });

        // Save the blog post to the database
        await newBlog.save();

        res.status(201).json({ message: 'Blog post created successfully', blog: newBlog });
    } catch (error) {
        res.status(500).json({ message: 'Server error while creating blog post', error: error.message });
    }
};
