const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const methodOverride = require("method-override");

const mongoose = require("mongoose");
const Event = require("./models/event");

mongoose
  .connect("mongodb://localhost:27017/reminderEvent")
  .then(() => {
    console.log("Mongo Conection Open!");
  })
  .catch((err) => {
    console.log("Mongo ERROR: ", err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
//for post
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  const events = await Event.find({});
  console.log({ events });
  res.render("main", { events });
  //res.sendFile(path.join(__dirname + "/public/html/main.html"));
});

app.post("/newEvent", async (req, res) => {
  const newEvent = new Event(req.body);
  await newEvent.save();
  res.redirect("/");
});

http.createServer(app).listen(3000);
