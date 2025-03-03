//message controller
const router = require("express").Router();

const Message = require("../model/message.model");

// const validateSession = require("../middleware/validate-session")

// add message route
// Request type: POST
// http://localhost:4000/message/add

router.post("/add", async (req, res) => {
  try {
    res.json({ message: `route works` });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
