//user controller
const router = require("express").Router();
const validateSession = require("../middleware/validate-session");
const User = require("../model/user.model");

// import jsonwebtoken for creating a token
const jwt = require("jsonwebtoken");
// import bcrypt for password hashing
const bcrypt = require("bcrypt");

// Endpoint: "http://localhost:4000/user/register"
// Request Type: POST

router.post("/register",  async (req, res) => {
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

    res.json({ message: `User Created Successfully!`, user: newUser, token: token });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// !Route for Login:
// endpoint: "http://localhost:4000/user/login"
// POST request
router.post("/login", async (req, res) => {
  try {
    // Destructure
    const { email, password } = req.body;

    // 2. Check the database to see if the email exists
    const user = await User.findOne({ email: email });

    //  Check u=if user exists and throw error if not
    if (!user) {
      throw new Error("User not found");
    }

    // Check/compare password
    const doesPasswordMatch = bcrypt.compareSync(password, user.password);

    // Throw error if password does not match
    if (!doesPasswordMatch) {
      throw new Error("Password is not a match");
    }

    // Create token

    const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "7d" });

    // update res.json with token
    res.json({ message: `Login successful!`, token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//! route for delete
// http://localhost:4000/user/delete/:id
router.delete("/delete/:id", validateSession, async (req, res) => {
  try {
    //1.
    //using model method of deleteOne()/ seeing id show up through url
    const user = await User.deleteOne({
      //supplying id
      _id: req.params.id,
    });

    //! ask how to check sicne theres no view all needed for user controller
    console.log(user);

    res.json({
      message: `User successfully deleted.`,
      deleteUser: user.deletedCount > 0 ? "User Deleted" : "User Not Found",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//!route for update/ 
// http://localhost:4000/user/update/:id
router.put("/update/:id", validateSession, async (req, res) => {
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
    const user = await User.findOneAndUpdate(filter, data, options);

    //6. update res.json with user info

    res.json({ message: `User updated successfully!`, user: user });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
