const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../model/userSchema");
require("dotenv").config();

const jwtkey = process.env.JWTKEY;
             
const router = express.Router();  
 
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
 
router.post("/register", async (req, res) => {
  const { email, password, lname, fname, confirmpassword } = req.body;
  if (!email || !password || !lname || !fname || !confirmpassword) {
    return res.status(400).send({ result: "All fields are required" });
  }
   
  if (!emailRegex.test(email)) {
    return res.status(400).send({ result: "Invalid email format" });
  }

  if (password !== confirmpassword) {
    return res.status(400).send({ result: "Passwords do not match" });
  }
 
  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    let data = new Users({ 
      email,
      password: hashedPassword,
      confirmpassword: hashedPassword,
      lname,   
      fname,  
    }); 

    let result = await data.save();

    //for using jwt for authentication 
    const token = jwt.sign({ userId: data._id }, jwtkey);
    res.send({ token });       

    result = result.toObject();
    delete result.password;

    res.send(result);
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      res.status(400).send({ result: `Duplicate value for field: ${field}` });
    } else {
      res.status(500).send({ result: "Internal server error" });
    }
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ result: "Email and password are required" });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).send({ result: "Invalid email format" });
  }

  let user = await Users.findOne({ email });
  try {
    if (user && (await bcrypt.compare(password, user.password))) {
      user = user.toObject();
      delete user.confirmpassword;
      delete user.fname;
      delete user.lname;

      const token = jwt.sign({userId:user._id},jwtkey)
      res.send({token})
      // res.send(user);
    } 
  } catch (error) {
     return res.status(400).send({ error: "Invalid email or password" });
    
  }
 
});

module.exports = router;
