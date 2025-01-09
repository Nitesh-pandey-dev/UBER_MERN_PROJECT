const crypto = require('crypto')
module.exports.genOtp = async(num) => {
    const otp = crypto.randomInt(Math.pow(10,num-1),Math.pow(10,num)).toString();
    // console.log(otp)
    return otp
}