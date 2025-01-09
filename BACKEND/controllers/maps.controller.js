const axios = require('axios');
const captainModel = require('../models/captain.model');
module.exports.getAddress = async(pickup) => {
    // let {address} = req.query;
    // console.log(address)
    if(!pickup) return console.log("Pickup is required!");
    // address = address.toString();
    if(pickup.length < 3) return console.log("Pickup must be right");
    const apikey = process.env.GOOGLE_MAP_API;
    // console.log(apikey)
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(pickup)}&key=${apikey}`
    console.log(url)
    try {
        const response = await axios.get(url);
        // console.log(response)
        if(response.data.status == 'OK'){
            const location = response.data.results[0].geometry.location;
            // console.log(location.lat)
            // console.log(location.lng)
            return {
                ltd:location.lat,
                lng:location.lng
            };
        }
        else{
            console.log("Unable to get ltd and lng");
        }
    } catch (error) {
        console.log(error)
        // res.json({success:false,message:error});
    }
}
module.exports.getDistance = async(origin,destination) => {
    // console.log("Origin",origin)
    if(!origin || !destination) return console.log("error")
    if(origin.length < 3 || destination.length < 3) return console.log("error")
    const apiKey = process.env.GOOGLE_MAP_API
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    try {
        // Send GET request to the Distance Matrix API
        const response = await axios.get(url);

        // Check if the response status is OK
        if (response.data.status === 'OK') {
            const result = response.data.rows[0].elements[0];
            
            if (result.status === 'OK') {
                // Get the distance and duration
                const distance = result.distance.text;
                const duration = result.duration.text;

                // Send the response back with distance and duration
                return({
                    success: true,
                    distance: distance,
                    duration: duration
                });
            } else {
                return console.log("Error")
            }
        } else {
            return console.log("error")
        }
    } catch (error) {
        console.error(error);
        return console.log("Error");
    }
}
module.exports.getSuggestions = async(req,res) => {
    const {input} = req.query;
    if(!input) return res.json({success:false,message:"Please provide input"});
    const apiKey = process.env.GOOGLE_MAP_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        if(response.data.status == "OK"){
            return res.json({success:true,message:response.data.predictions})
        }
        else{
            return res.json({success:false,message:"Unable to get suggestions!!"});
        }
        // console.log(res.data.predictions)
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error});
    }
}
module.exports.fares = async(req,res)=>{
    console.log("req.fare",req.fare)
    if(req.fare) return res.json({success:true,message:req.fare});
    else{
        return res.json({success:false,message:"Unable to get fare"})
    }
}
module.exports.getCaptainInTheRadius = async(ltd,lng,raduis) => {
    const captains = await captainModel.find({
        location:{
            $geoWithin:{
                $centerSphere:[[ltd,lng],raduis/6371]
            }
        }
    })
    console.log("captains",captains)
    return captains;
}