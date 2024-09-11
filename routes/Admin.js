const router = require("express").Router();
let AdminDB = require("../models/Admin.models");
const bcrypt = require('bcrypt');

router.route("/register").post(async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Manual Validation
    if (!username || username.length < 3) {
      return res.status(400).json("Username must be at least 3 characters long");
    }

    if (!password || password.length < 3) {
      return res.status(400).json("Password must be at least 3 characters long");
    }

    if (!email || !validateEmail(email)) {
      return res.status(400).json("Email must be a valid email address");
    }

    // Check if user already exists
    let admin = await AdminDB.findOne({ username });
    if (admin) return res.status(400).json("User already exists");

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new admin
    admin = new AdminDB({
      username,
      password: hashedPassword,
      email
    });

    // Save the admin to the database
    await admin.save();

    return res.status(201).json("User registered successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).json("An Unexpected Error Occurred");
  }
});

// Helper function to validate email format
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

router.route("/login").post(async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const admin = await AdminDB.findOne({ username });
    if (!admin) return res.status(400).json("User not found");

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json("Password doesn't match");

    // If login is successful
    return res.json("Login Successful");
  } catch (error) {
    console.error(error);
    return res.status(500).json("An Unexpected Error Occurred");
  }
});






//   router.route('/resetPassword').post(async (req,res) => {
//         const username = req.body.username;

//         let admin = await AdminDB.findOne({username});

//         if(!admin)
//             return res.status(400).json("User Not Exist");

//         admin.pass
//   });

module.exports = router;
