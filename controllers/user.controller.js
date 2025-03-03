//user controller
const router = require("express").Router();
const User = require("../model/user.model");

// import jsonwebtoken for creating a token
const jwt = require("jsonwebtoken");
// import bcrypt for password hashing
const bcrypt = require("bcrypt");

// Endpoint: "http://localhost:4000/user/register"
// Request Type: POST
router.post("/register", async (req, res) => {
  try {
    // Destructure
    const { firstName, lastName, email, password } = req.body;

    // Create  variable and use the User model to create a new user
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: bcrypt.hashSync(password, 10), //hashing the password
    });

    //  Save the new user in the database and store the response in a variable
    const newUser = await user.save();

    // 5. Create a token - three parameters - (what you want stored, secret_word, options like expiring)
    const token = jwt.sign({ id: newUser._id }, "secret", { expiresIn: "7d" });

    res.json({ message: `route works`});
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
