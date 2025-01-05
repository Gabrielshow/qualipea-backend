const Blog = require('../schema/blogSchema');

const deleteBlog = async (req, res) => {
    try {
        const { blogId } = req.params; // Get blog ID from URL

        // Find the blog post by ID
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        // Check if the logged-in user is the author
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can only delete your own posts' });
        }

        // Delete the blog post
        await blog.remove();

        res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error while deleting blog post', error: error.message });
    }
};

module.exports = { deleteBlog };

