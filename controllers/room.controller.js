//room controller
const router = require("express").Router();
const Room = require("../model/room.model");
const validateSession = require("../middleware/validate-session");



//create endpoint
router.post('/add', validateSession, async (req, res) => {
try{
      //1. 
     // destructuring the request body
     //taking it out of the req.body
    const { name, description, addedUsers } = req.body;

    //2.
    //testing to see if when shows up in terminal
    console.log(name);

    //3.
    // create variable & use User model to create a new room
    const room = new Room({
     name,
     description,
     addedUsers: [req.user._id]
    })

    //4.
    //save new room in database & store response in variable
    const newRoom = await room.save()

    //5. 
    //updating JSON with new room
res.json({ message: `route works`, room: newRoom });
} catch (error) {
res.json({ message: error.message });
}
})


//display all endpoint
//localhost:4000/room/view-all
router.get("/view-all", async (req, res) => {
  try {
    //1. variable to store response using MODEL and FIND method
    const rooms = await Room.find({});

    //2. add to res.json variable (rooms)

    res.json({ message: `route works`, rooms: rooms });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//update route
//localhost:4000/room/update/:id
router.put("/update/:id", async (req, res) => {
  try {
    //1. store id in a variable
    const id = req.params.id;

    //2. variable called filter that will store an object of what we are looking for
    const filter = { _id: id };

    //3. variable called data to store req.body
    const data = req.body;

    //4. update options: create variable called options
    const options = { new: true };

    //5. use Model's method of findByIdAndUpdate(filter,data, options) & store in variale
    const room = await Room.findOneAndUpdate(filter, data, options);

    //6. update res.json with room info

    res.json({ message: `route works`, room: room });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//route for delete
//localhost:4000/room/delete/:id
router.delete("/delete/:id", async (req, res) => {
  try {
    //1.using model method of deleteOne()/ seeing id show up through url
    const room = await Room.deleteOne({
      //supplying id
      _id: req.params.id,
    });

    //2. log pet to check/ take an id from view all, copy  & put into route of delete & paste into value/ should see in terminal
    console.log(room);

    //Ternary operator = conditional, if >0, : = otherwise/
    //IF if (conditional) {do this} else {or this} TERNARY conditional ? do this : or this

    res.json({
      message: `route works`,
      deleteRoom: room.deletedCount > 0 ? "Room Deleted" : "Room Not Found",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
