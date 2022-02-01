const PORT = process.env.PORT || 3000

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
const ejs = require("ejs")
const { Schema } = mongoose;

require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cors());

const uri = process.env.URI ;

mongoose.connect(uri);

const videoSchema = Schema({
    videoLink:String,
    videoTopic:String,
    videoAuthor:String
})

const linkSchema = Schema({
    _id: Schema.Types.ObjectId,
    subtopic:String,
    link:String,
    videos:[{ type: Schema.Types.ObjectId, ref: 'Video' }]
})

const subjectSchema = Schema({
   _id: Schema.Types.ObjectId,
   subject:String,
   links:[{ type: Schema.Types.ObjectId, ref: 'Link' }]
})

const Video = mongoose.model("Video", videoSchema)
const Link = mongoose.model("Link", linkSchema)
const Subject = mongoose.model("Subject", subjectSchema)


app.get('/',(req,res)=>{

    const subject1 = new Subject({
        subject:"Web Dev",
        links:defaultLinks
    })

    subject1.save();
    
    res.send("Hello World!!")
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))