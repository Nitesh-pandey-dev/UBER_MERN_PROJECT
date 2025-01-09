const jwt = require('jsonwebtoken');
const genToken = (user) => {
    const token = jwt.sign({email:user.email,id:user._id},process.env.JWT_SECRET);
    return token;
}
module.exports = genToken;