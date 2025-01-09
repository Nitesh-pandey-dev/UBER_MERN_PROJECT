const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const check = async(req,res,next) => {
    const token = req.cookies.token || req.headers.token;
    if(!token) return res.json({success:false,message:"User is not authenticated"});
    const decode = jwt.verify(token,process.env.JWT_SECRET);
    const user = await userModel.findOne({email:decode.email});
    req.user = user;
    next()
}
module.exports = check;