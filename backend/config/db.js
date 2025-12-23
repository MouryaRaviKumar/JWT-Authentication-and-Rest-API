const mongoose = require("mongoose");

connectDB()
    .then(()=> console.log("MongoDB Database Connected Successfully"))
    .catch(err => console.log(err.msg));

async function connectDB(){
    await mongoose.connect(process.env.MONGO_URI);
}

module.exports = { connectDB };