const jwt = require('jsonwebtoken');
const User = require('../model/user');


exports.loginCheck = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;
     if (authorization && authorization.startsWith('Bearer')) {
        try {
            token = authorization.split(' ')[1];
            // console.log(token);
            //verify token 
            const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
            //Get user from token 
            req.user = await User.findById(userId).select('-password');
            console.log(req.user);
            req.userId = userId
            next();
        } catch (err) {
            console.log(err);
            res.status(500).josn({
                "message": "unauthorizaied user"
            })
        }
     }
    if (!token) {
        res.status(401).json({
            "message": "unauthorizaied user, No token"
        })
    }
}