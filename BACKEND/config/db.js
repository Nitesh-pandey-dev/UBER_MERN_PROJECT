const mongoose = require('mongoose');
// console.log(`${process.env.MONGOURI_USERNAME} ${process.env.MONGOURI_PASSWORD}`);
mongoose.connect(`${process.env.MONGO_URI}`,{serverSelectionTimeoutMS: 60000})
.then(() => console.log('Connected to MongoDB successfully!'))
.catch(err => console.error('Could not connect to MongoDB', err));
module.exports = mongoose.connection;