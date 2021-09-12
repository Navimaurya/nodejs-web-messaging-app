//database configuration
const mongoose = require('mongoose');
const catchAsync = require('../utils/catchAsync');
//Linking database (mongoDb)
//Mongodb Offline setup
exports.database = async ()=>{
    try {
        const con = await mongoose.connect(process.env.DATABASEURL , {
                useNewUrlParser: true,
                useFindAndModify: false,
                useCreateIndex: true,
                useUnifiedTopology: true,
            });
        if (con){
            console.log("DB connection successful!")
        }
    } catch (err){
        console.log(err)
        console.log("Database connection failed!");
    }
}