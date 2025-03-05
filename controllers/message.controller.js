//message controller
const router = require("express").Router();

const validateSession = require("../middleware/validate-session")

const Message = require("../model/message.model");






// const validateSession = require("../middleware/validate-session")

// add message route
// Request type: POST
// http://localhost:4000/message/add


router.post("/add/:roomId", validateSession,  async (req, res) => {
  try {
     //1. 
     // destructuring the request body
    //taking it out of the req.body
    const {  body } = req.body;

    //2.
    //testing to see if when shows up in terminal
    

     

    //3.
    // create variable & use User model to create a new user
    const message = new Message ({
      when: Date(),
      user: req.user._id,
      room: req.params.roomId,
      body: body,
      
    })

    //4.
    //save new user in database & store response in variable
    const newMessage = await message.save()

    

    //5. 
    //updating JSON with new message

    
    res.json({ message: `route works`,  message: newMessage });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//!Display all route
//ocalhost:4000/message/view-all
router.get('/view-all', validateSession, async (req, res) => {
try{
  //1. 
  //variable to store response using MODEL and FIND method
  const messages = await Message.find({})

  //2. 
  //add to res.json variable (pets)
res.json({ message: `route works`, messages: messages });
} catch (error) {
res.json({ message: error.message });
}
})

//!Endpoint for delete/ need help 
// localhost:4000/message/delete/:id
router.delete('/delete/:id', validateSession, async(req, res) => {
try{
  //1.
  //using model method of deleteOne()/ seeing id show up through url
  const message = await Message.deleteOne({
    //supplying id
    _id: req.params.id,
  })

  //2. 
  //log message to check/ take an id from view all, copy  & put into route of delete & paste into value/ should see in terminal 
  console.log(message);


res.json({ message: `route works`, deleteMessage: message.deletedCount > 0 ? "Message Deleted" : "Message Not Found"});
} catch (error) {
res.json({ message: error.message });
}
})

//!route for update
// localhost:4000/message/update/:id
router.put('/update/:id', validateSession, async (req, res) => {
try{
  //1. 
  //store id in a variable
  const id = req.params.id 

  //2. 
  //variable called filter that will store an object of what we are looking for
  const filter = { _id: id}

  //3. 
  //variable called data to store req.body
  const data = req.body

  //4. 
  //update options: create variable called options
  const options = {new: true}

  //5. 
  //use Model's method of findByIdAndUpdate(filter,data, options) & store in variale
  const message = await Message.findOneAndUpdate(filter, data, options)

  //6.
  //update res.json with message info
res.json({ message: `route works`, message: message });
} catch (error) {
res.json({ message: error.message });
}
})

module.exports = router;
