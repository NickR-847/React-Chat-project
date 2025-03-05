//user controller
const router = require("express").Router();

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

    res.json({ message: `route works`, token: token});
  } catch (error) {
    res.json({ message: error.message });
  }
});

//! route for delete
router.delete('/delete/:id', async (req, res) => {
try{
  //1.
  //using model method of deleteOne()/ seeing id show up through url
    const user = await User.deleteOne({
          //supplying id
          _id: req.params.id,
      })

      //! ask how to check sicne theres no view all needed for user controller
      console.log(user);


      
res.json({ message: `route works`, deleteUser: user.deletedCount > 0 ? "User Deleted" : "User Not Found"  });
} catch (error) {
res.json({ message: error.message });
}
})

//!route for update/ ask how to check since theres no view all
router.put('/update/:id', async(req, res) => {
try{
  //1. store id in a variable
  const id = req.params.id 

   //2. variable called filter that will store an object of what we are looking for
   const filter = { _id: id}

    //3. variable called data to store req.body
    const data = req.body

    //4. update options: create variable called options
    const options = {new: true}

     //5. use Model's method of findByIdAndUpdate(filter,data, options) & store in variale
     const user = await User.findOneAndUpdate(filter, data, options)

      //6. update res.json with user info

res.json({ message: `route works`, user: user });
} catch (error) {
res.json({ message: error.message });
}
})

module.exports = router;
