const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const genToken = require('../middlewares/generateToken');
module.exports.register = async(req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({success:false,errors:errors.array()});
    }
    try {
        // console.log(req.body)
        const {firstname,lastname,email,phone,password} = req.body 
        // console.log(firstname,lastname)
    if(!firstname || !email || !password || !phone) return res.json({success:false,message:"Please provide complete info!!"});
    const phonee = phone.toString();
    if(phonee.length > 10 || phonee.length < 10) return res.json({success:false,message:"Please enter exact 10 digits phone number!!"});
    const userExists = await userModel.findOne({email:email});
    if(userExists) return res.json({success:false,message:"User with this email already exists!!"});
    bcrypt.genSalt(10,(error,salt)=>{
        bcrypt.hash(password,salt,async(error,hash)=>{
            const user = await userModel.create({
                    firstname:firstname,
                    lastname:lastname,
                    password:hash,
                    phone:Number(phone),
                    email:email
            })
            if(user) {
                const token = genToken(user);
                const userr = await userModel.findOne({email:email}).select("-password");
                return res.cookie("token",token,{httpOnly:true,maxAge:3600000,sameSite:'Strict'}).json({success:true,message:"User Registered Successfully!!",userr,token});
            }
        })
    })
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error});
    }
    
}
module.exports.login = async(req,res,next) =>{
    try {
        let {email,password} = req.body;
        if(!email) return res.json({success:false,message:"Email is required to login"});
        if(!password) return res.json({success:false,message:"Password is required to login"});
        const user = await userModel.findOne({email:email}).select("+password");
        if(!user) return res.json({success:false,message:"Invalid email or password!!"});
        bcrypt.compare(password,user.password,async(error,result)=>{
            if(result){
                const token = await genToken(user);
                // console.log(token)
                if(token){
                    const userr = await userModel.findOne({email:user.email});
                    return res.cookie("token",token,{httpOnly:true,maxAge:3600000,sameSite:'Strict'}).json({success:true,message:"User Logged In successfully!!",userr,token});
                }
                else{
                    return res.json({success:false,message:"Unable to generate token!!"});
                }
            }
            else{
                return res.json({success:false,message:"Incorret email or password!!"});
            }
        })
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error});
    }
}
module.exports.profile = async(req,res,next) => {
    try {
        const userr = await userModel.findOne({email:req?.user?.email});
        // console.log(req.user.email);
        if(userr){
            return res.json({success:true,message:"User Profile Fetched Successfully!!",userr});
        }
        else{
            return res.json({success:false,message:"Unable to get user's profile!!"});
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error});
    }
}
module.exports.logout = async(req,res,next) => {
    try {
        res.clearCookie('token');
        return res.cookie("token","").json({success:true,message:"User logged out successfully!!"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error});
    }
}