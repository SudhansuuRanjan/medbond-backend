const PORT = process.env.PORT || 3000
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs")
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const uri = process.env.URI ;

mongoose.connect(uri);

const videoSchema = {
    videoLink:String,
    videoTopic:String,
    videoAuthor:String
}

const Video = mongoose.model("Video", videoSchema)

const linkSchema = {
    subtopic:String,
    link:String,
    videos:[videoSchema]
}

const Link = mongoose.model("Link", linkSchema)

const subjectSchema ={
   subject:String,
   links:[linkSchema]
}

const Subject = mongoose.model("Subject", subjectSchema)




const defaultVideo11 = new Video({
    videoLink:"https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
    videoTopic:"DSA",
    videoAuthor:"freeCodeCamp"
})

const defaultVideo12 = new Video({
    videoLink:"https://www.freecodecamp.org/learn/responsive-web-design/",
    videoTopic:"Web Design",
    videoAuthor:"freeCodeCamp"
})

const defaultVideo21 = new Video({
    videoLink:"https://www.freecodecamp.org/learn/libraries/",
    videoTopic:"libraries",
    videoAuthor:"freeCodeCamp"
})

const defaultVideo22 = new Video({
    videoLink:"https://www.freecodecamp.org/learn/modules/",
    videoTopic:"Web Design",
    videoAuthor:"freeCodeCamp"
})

const defaultVideo2 = [defaultVideo21 , defaultVideo22]
const defaultVideo1 = [defaultVideo11 , defaultVideo12]

const link1 = new Link({
  name: "Freecodecamp",
  link:"https://www.freecodecamp.com/",
  videos: [defaultVideo1]
});

const link2 = new Link({
   name: "Youtube",
   link:"https://www.youtube.com/",
   videos: [defaultVideo2]
});

const defaultLinks = [link1 , link2];

app.get('/',(req,res)=>{

    const subject1 = new Subject({
        subject:"Web Dev",
        links:defaultLinks
    })

    subject1.save();
    
    res.send("Hello World!!")
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))