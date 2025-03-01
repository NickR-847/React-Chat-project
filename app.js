// develop
//John Branch
//Boiler plate
const mongoose = require("mongoose")
const express = require("express");
const app = express();

//importing controllers
const messageController = require ("./controllers/message.controller")
const roomController = require ("./controllers/room.controller")
const userController = require ("./controllers/user.controller")

//connecting to database
//! change link 
mongoose.connect("mongodb://localhost:27017/instapet-db")
const db = mongoose.connection 
db.on("error", console.error.bind(console, "Connection error"));

//middleware
app.use(express.json());

//controller routes
app.use("/message", messageController)
app.use("/room", roomController)
app.use("/user", userController)

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});