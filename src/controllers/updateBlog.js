const Blog = require('../schema/Blog');

const updateBlog = async (req, res) => {
    try {
        const { blogId } = req.params; // Get blog ID from URL
        const { title, content, categories, tags } = req.body;

        // Find the blog post by ID
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        // Check if the logged-in user is the author
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can only update your own posts' });
        }

        // Update the blog post fields
        blog.title = title || blog.title;
        blog.content = content || blog.content;
        blog.categories = categories || blog.categories;
        blog.tags = tags || blog.tags;

        // Save the updated blog post
        await blog.save();

        res.status(200).json({ message: 'Blog post updated successfully', blog });
    } catch (error) {
        res.status(500).json({ message: 'Server error while updating blog post', error: error.message });
    }
};

module.exports = { updateBlog };