const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');
let io;
function initializeSocket(server) {
    io=socketIo(server,{
        cors:{
            origin:"*",
            methods:['GET','POST']
        }
    });
    io.on('connection',(socket)=>{
        console.log(`Client connected: ${socket.id}`);
        socket.on('join',async(data)=>{
            const {userid,usertype} = data
            console.log("userid",userid,usertype,socket.id)
            if(usertype == 'user'){
                return await userModel.findByIdAndUpdate(userid,{socketid:socket.id});
            }
            else if(usertype == 'captain'){
                return await captainModel.findByIdAndUpdate(userid,{socketid:socket.id})
            }
        })
        // We will continue from here.....................time:9:29:00
        socket.on('update-location-captain',async(data)=>{
            const {userid,latitude,longitude} = data;
            // console.log("latitude",longitude)
            await captainModel.findByIdAndUpdate(userid,{location:{ltd:Number(latitude),lng:Number(longitude)}},{new:true})
        })
        socket.on('disconnect',()=>{
            console.log(`Client disconnected: ${socket.id}`)
        })
    })
}
function sendMessageToSocketId(socketId,data){
    // console.log("socketId",socketId);
    // console.log("data",data);
    if(io){
        console.log(`Sending message to ${socketId} and data is ${data}`);
        io.to(socketId).emit(data.event,data);
    }
    else{
        // console.log("else")
        console.log("Socket.io is not initialized!!");
    }
}
module.exports = {sendMessageToSocketId,initializeSocket};