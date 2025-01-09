const { axios } = require("axios")
const { getDistance, getCaptainInTheRadius, getAddress } = require("./maps.controller");
const rideModel = require("../models/ride.model");
const { genOtp } = require("../config/genOtp");
const { sendMessageToSocketId } = require("../socket");

module.exports.createRide = async(req,res) => {
    const {pickup,destination,vehicletype} = req.headers
    if(!pickup || !destination || !vehicletype) return res.json({success:false,message:"Please provide complete detail!!"});
    let otp = await genOtp(4);
    otp = otp.toString()
    // console.log(otp)
    const ride = await rideModel.create({
        userid:req.user._id,
        pickup:pickup,
        destination:destination,
        otp:otp,
        fare:(req.fare[vehicletype]).toFixed(2)
    })
    if(ride){
        const pickupCoordinates = await getAddress(pickup)
        // console.log("pickupCoordinates",pickupCoordinates)
        const captainInRadius = await getCaptainInTheRadius(pickupCoordinates.ltd,pickupCoordinates.lng,2);
        // console.log(captainInRadius)
        ride.otp = "";
        const rideWithUser = await rideModel.findById(ride._id).populate('userid').select("-socketid");
        captainInRadius.map(captain => {
            // console.log(captain)
            // console.log(captain?.vehicle?.vehicletype)
            if(captain?.vehicle?.vehicletype === vehicletype){
                sendMessageToSocketId(captain.socketid,{event:'new-ride',rideWithUser})
            }
            else{
                console.log("No captain found in the radius!!")
            }
        })
        // console.log(captainInRadius);
    }
    else{
        console.log("Something went wrong!!");
    }
    ride?res.json({success:true,message:"Ride created successfully!!",ride}):res.json({success:true,message:"Unable to create ride!!"});
}
module.exports.confirmRide = async(req,res) => {
    const {rideid} = req.headers;
    console.log(rideid)
    if(!rideid) return res.json({success:false,message:"Please provide rideid!!"});
    const ride = await rideModel.findByIdAndUpdate(rideid,{status:'accepted',captainid:req.captain._id},{new:true}).populate('userid').populate('captainid').select("+otp");
    console.log("ride",ride)
    if(!ride) return res.json({success:false,message:"Ride not found!!"});
    await sendMessageToSocketId(ride.userid.socketid,{event:'ride-accepted',ride});
    return res.json({success:true,message:"Ride Accepted",ride});
}
module.exports.checkOtp = async(req,res) => {
    let {otp,rideid} = req.headers;
    rideid = rideid.toString();
    otp = otp.toString();
    // console.log("otp",otp);
    // console.log("rideid",rideid);
    if(!otp || !rideid) return res.json({success:false,message:"Please provide otp and rideid!!"});
    const ride = await rideModel.findById(rideid).populate('userid').select("+otp");
    if(!ride) return res.json({success:false,message:"Ride not found!!"});
    // console.log("ride",ride)
    const checkk = ride?.otp == otp;
    // console.log("checkk",checkk)
    if(!checkk) return res.json({success:false,message:"Invalid otp!!"});
    sendMessageToSocketId(ride.userid.socketid,{event:'otp-verified',data:ride});
    return res.json({success:true,message:"Otp verified!!"});
}
module.exports.endride = async(req,res) => {
    const {rideid} = req.headers;
    if(!rideid) return res.json({success:false,message:"Please provide rideid!!"});
    const ride = await rideModel.findOne({_id:rideid,captainid:req.captain._id});
    if(!ride) return res.json({success:false,message:"Ride not found!!"});
    const updatedRide = await rideModel.findByIdAndUpdate(rideid,{status:'completed'},{new:true}).populate('userid').populate('captainid').select("-otp");
    if(updatedRide){
        sendMessageToSocketId(updatedRide.userid.socketid,{event:'ride-completed',data:updatedRide});
        return res.json({success:true,message:"Ride completed successfully!!"});
    }
}