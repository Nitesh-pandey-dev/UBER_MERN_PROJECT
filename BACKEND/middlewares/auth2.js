const jwt = require("jsonwebtoken");
const captainModel = require("../models/captain.model");
const check2 = async(req,res,next) => {
    const token = await req.cookies.token || req.headers.token;
    // console.log(token)
    if(!token) return res.json({success:false,message:"Unauthorised user"});
    const decode = jwt.verify(token,process.env.JWT_SECRET);
    const captain = await captainModel.findOne({email:decode.email});
    // console.log(captain)
    if(!captain) return res.json({success:false,message:"Unable to get captain!!"});
    req.captain = captain;
    next();
}
module.exports = check2;