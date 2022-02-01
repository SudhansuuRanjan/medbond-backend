const PORT = process.env.PORT || 3000;

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const ejs = require("ejs");
const { Schema } = mongoose;

require("dotenv").config();

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

const uri = process.env.URI;

mongoose.connect(uri);

const personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: "Story" }],
});

const storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: "Person" },
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: "Person" }],
});

const Story = mongoose.model("Story", storySchema);
const Person = mongoose.model("Person", personSchema);

app.get("/", (req, res) => {
  Story.findOne({ title: "Casino Royale" })
    .populate("author")
    .exec((err, story) => {
      if (err) return handleError(err);
      console.log("The author is %s", story.author.name);
    });

  res.send("Hello World!!");
});

app.get("/pop", (req, res) => {
  //saving ref

  const author = new Person({
    _id: new mongoose.Types.ObjectId(),
    name: "Ian Fleming",
    age: 50,
  });

//   author.save(function (err) {
//     if (err) return handleError(err);

//     const story1 = new Story({
//       title: "Casino Royale",
//       author: author._id, // assign the _id from the person
//     });

//     story1.save(function (err) {
//       if (err) return handleError(err);
//       // that's it!
//     });
//   });

  //population

//   Story.findOne({ title: "Casino Royale" })
//     .populate("author")
//     .exec(function (err, story) {
//       if (err) return handleError(err);
//       console.log("The author is %s", story.author.name);
//       // prints "The author is Ian Fleming"
//     });

  Story.findOne({ title: "Casino Royale" }, function (error, story) {
    if (error) {
      return handleError(error);
    }
    story.author = author;
    console.log(story.author.name);
     // prints "Ian Fleming"

     story.populated('author');
  });
   res.send("populated");
  
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
