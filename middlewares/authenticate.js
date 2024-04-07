const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization; //.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
       // console.log(user.id);
        req.user = user;

        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = authenticate;