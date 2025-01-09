const genToken = require("../middlewares/generateToken");
const captainModel = require("../models/captain.model");
const bcrypt = require('bcrypt');

module.exports.register = async(req,res,next) => {
    let {firstname,lastname,phone,email,password,vehiclecolor,vehicleplate,vehiclecapacity,vehicletype} = req.body
    if(!firstname || !email || !password || !vehiclecolor || !phone || !vehicletype || !vehicleplate) return res.json({success:false,message:"Please provide complete info!!"});
    if(!req.file) return res.json({success:false,message:"Please upload captain image!!"})
    const phonee = phone.toString();
    if(phonee.length > 10 || phone.length < 10) return res.json({success:false,message:"Please enter correct phone no."});
    if(firstname.length < 3) return res.json({success:false,message:"Firstname must contain atleast 3 characters!!"});
    if(!vehiclecolor || !vehicleplate || !vehicletype) return res.json({success:false,message:"Vehicle color and Number is required!!"});
    const existingCaptain = await captainModel.findOne({email});
    if(existingCaptain) return res.json({success:false,message:"Invalid email or password!!"});
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async(err,hash)=>{
            // console.log(hash)
            const captain = await captainModel.create({
                fullname:{
                    firstname:firstname,
                    lastname:lastname
                },
                email:email,
                password:hash,
                image:req.file.filename,
                phone:Number(phone),
                vehicle:{
                    color:vehiclecolor,
                    capacity:vehiclecapacity,
                    plate:vehicleplate,
                    vehicletype:vehicletype
                }
            })
            if(captain){
                const token = genToken(captain);
                // console.log(token)
                if(token){
                    return res.cookie("token",token).json({success:true,message:"Captain registered successfully!!",captain,token})
                }
            }
        })
    })
}
module.exports.login = async(req,res,next) => {
    try {
        const {email,password} = req.body
        if(!email || !password) return res.json({success:false,message:"Please provide complete info!!"});
        const captain = await captainModel.findOne({email}).select("+password");
        if(!captain) return res.json({success:false,message:"Invalid email or password!!"});
        bcrypt.compare(password,captain.password,(err,result)=>{
            if(!result) return res.json({success:false,message:"Invalid email or password!!"});
            const token = genToken(captain);
            if(token){
                return res.cookie("token",token).json({success:true,message:"Captain login successfully!!",token,captain})
            }
        })
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error});
    }
}
module.exports.profile = async(req,res,next) => {
    const captain = req.captain;
    // console.log(captain);
    if(!captain) return res.json({success:false,message:"Unable to get captain's profile!!"});
    return res.json({success:true,message:"Captain's profile fetched successfully!!",captain});
}
module.exports.logout = async(req,res,next) => {
    try {
        res.clearCookie("token");
        return res.cookie("token","").json({success:true,message:"Captain Logged out successfully!!"});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error});
    }
}