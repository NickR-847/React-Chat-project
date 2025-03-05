//room controller
const router = require("express").Router();
const Room = require("../model/room.model");
const validateSession = require("../middleware/validate-session");

//! endpoint to create/add room:
// localhost:4000/room/add
router.post("/add", validateSession, async (req, res) => {
  try {
    //1.
    // destructuring the request body
    //taking it out of the req.body
    const { name, description } = req.body;

    //2.
    //testing to see if when shows up in terminal
    // console.log(name);

    //3.
    // create variable & use User model to create a new room
    const room = new Room({
      name,
      description,
      addedUsers: [req.user._id],
    });

    //4.
    //save new room in database & store response in variable
    const newRoom = await room.save();

    //5.
    //updating JSON with new room
    res.json({ message: "Room created successfully", room: newRoom });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//!display all rooms endpoint
//http://localhost:4000/room/view-all
router.get("/view-all", async (req, res) => {
  try {
    //1. variable to store response using MODEL and FIND method
    const rooms = await Room.find({});

    //2. add to res.json variable (rooms)

    res.json({ message: "All rooms displayed successfully.", rooms: rooms });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//! UPDATE ROOM
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
    res.json({ message: "Room updated successfully", room: room });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//!DELETE ROOM
//localhost:4000/room/delete/:id
router.delete("/delete/:id", async (req, res) => {
  try {
    // find the room to get room name
    const roomToDelete = await Room.findById(req.params.id);

    if (!roomToDelete) {
      return res.status(404).json({
        message: "Room not found",
        deleteRoom: "Room Not Found",
      });
    }

    //  store room name as variable:
    const roomName = roomToDelete.name;

    // delete the room
    const room = await Room.deleteOne({
      _id: req.params.id,
    });
    //Ternary operator = conditional, if >0, : = otherwise/
    //IF if (conditional) {do this} else {or this} TERNARY conditional ? do this : or this

    res.json({
      message: `Room "${roomName}" was deleted successfully`,
      deleteRoom: room.deletedCount > 0 ? "Room Deleted" : "Room Not Found",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// !Add a user to a room:
//  http://localhost:4000/room/add-user/:roomId/:userId
router.put("/add-user/:roomId/:userId", validateSession, async (req, res) => {
  try {
    const { roomId, userId } = req.params;

    // find room from ID and store
    const room = await Room.findById(roomId);

      // See if user is already in the room
      // Must check before adding user to array
      if (room.addedUsers.includes(userId)) {
        return res.status(400).json({
          message: "User has already been added to this room",
        });
      }

    // Add the user to the array of users
    room.addedUsers.push(userId);

    //  save updated room
    await room.save();



    // update res.json with updated room/user array
    res.json({ message: "User added to room successfully", room: updatedRoom });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
