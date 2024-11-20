const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;

db.on('connected', () =>{
    console.log("Connected to MongoDB server"); 
})

db.on('error', (err) =>{
    console.log(`MongoDB connection error: `, err); 
})

db.on('disconnected', () =>{
    console.log("MongoDB disconnected"); 
})


module.exports = db;