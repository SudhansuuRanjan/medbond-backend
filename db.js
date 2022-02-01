const mongoose = require('mongoose')
require("dotenv").config();
const uri = "mongodb://localhost:27017/testDB";

module.exports = async function connection(){
    try{
        const connectionParams ={
            useNewUrlParser:true,
            useCreateIndex:true,
            useUnifiedTopology:true
        }
        await mongoose.connect(uri);
        console.log("Connected to Databse.")
    }catch(err){
       console.log(err);
       console.log("could not connect to database!!");
    }
}