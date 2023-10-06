const jwt = require("jsonwebtoken");

const GenerateJWT = (user) => {
    const token = jwt.sign(user.toObject(),'apikey');

    return token;
}

const VerifyJWT = (req,res,next) => {
    
    const token = req.headers['authorization'];
    const user = jwt.verify(token,'apikey');
req.user = user;
    // return user;
    next();
}
module.exports = {
    GenerateJWT,VerifyJWT
}