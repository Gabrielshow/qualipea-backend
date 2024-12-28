import jwt from 'jsonwebtoken';
import User from '../schema/User';

// JWT authentication middleware
export const authenticateUser = async (req, res, next) => {
    try {
        // Get token from the authorization header
        const token = req.headers.authorization?.split(' ')[1]; // Token comes in as 'Bearer <token>'
        
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
        const user = await User.findById(decoded.userId); // Find user from decoded ID

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user; // Attach the user to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
