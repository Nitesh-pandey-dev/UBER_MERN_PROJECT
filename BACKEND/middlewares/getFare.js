const { getDistance } = require("../controllers/maps.controller");

const getFare = async(req,res,next) => {
    const {pickup,destination} = req.headers
    console.log(pickup,destination)
    if(!pickup || !destination) return res.json({success:false,message:"Please provide both origin and destination"})
    if(pickup.length < 3 || destination.length < 3) return res.json({success:false,message:"Origin and destination must contain 3 characters!!"})
    const data = await getDistance(pickup,destination);
console.log(data)
const distancee = parseFloat(data?.distance);
const durationn = parseFloat(data?.duration);
console.log(distancee,durationn)
// console.log(data)
const basefare = {
    auto:17,
    car:20,
    bike:15
};
const perKmRate = {
    auto:7,
    car:8,
    bike:6
};
const perMinRate = {
    auto:2,
    car:2.5,
    bike:1.5
};
const fare = {
    auto:basefare.auto + (perKmRate.auto * distancee) + (durationn * perMinRate.auto),
    car:basefare.car+(perKmRate.car * distancee) + (durationn * perMinRate.car),
    bike:basefare.bike+(perKmRate.bike * distancee + durationn * perMinRate.bike)
}
console.log("fare",fare)
req.fare = fare;
next()
}
module.exports = getFare;