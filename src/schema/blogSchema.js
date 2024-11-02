import { Schema, models, model } from "mongoose";

const BlogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true, // Removes extra spaces
            maxLength: 150 // Maximum title length
        },
        content: {
            type: String,
            required: true,
            minLength: 10 // Minimum content length
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
            required: true
        },
        categories: {
            type: [String], // Array of strings for categories
            default: [] // Default to an empty array
        },
        tags: {
            type: [String], // Array of strings for tags
            default: [] // Default to an empty array
        }
    },
    { timestamps: true } // Automatically create createdAt and updatedAt fields
);

const Blog = models.Blog || model('Blog', BlogSchema);
export default Blog;
