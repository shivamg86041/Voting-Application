const express = require("express");
const User = require("../models/user");
const router = express.Router();
const { jwtAuthMiddleware, generateToken } = require("../jwt");

router.post("/signup", async (req, res) => {
  try {
    const info = req.body;

    const existingUser = await User.findOne({aadharCardNumber: info.aadharCardNumber});
    if(existingUser){
        return res.status(400).json({message:"User already exists. Please login"})
    }

    if (info.role === "admin") {
        // Check if an admin already exists
        const existingAdmin = await User.findOne({ role: "admin" });
        if (existingAdmin) {
          return res.status(400).json({ error: "Admin already exists. Signup not allowed." });
        }
      }

    const newUser = new User(info);

    const response = await newUser.save();

    console.log("Data saved");
    const payload = {
      id: response.id,
    };
    const token = generateToken(payload);
    console.log("Token is : ", token);

    res.status(200).json({ response: response, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { aadharCardNumber, password } = req.body;

    const user = await User.findOne({ aadharCardNumber: aadharCardNumber });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // generate token
    const payload = {
      id: user.id,
    };

    const token = generateToken(payload);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const persons = await Person.find();
    console.log("data fetched");
    res.status(200).json({ persons });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/profile", jwtAuthMiddleware, async(req, res) =>{
  try {
    const userData = req.user;

    const userId = userData.id;
    const user = await User.findById(userId);
    res.status(200).json({user});
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"Internal server error"});
  }
})

router.put("/profile/password", jwtAuthMiddleware, async (req, res) => {
  try {
    const id = req.user;
    const {currentPassword, newPassword} = req.body;
    const user = await User.findById(id);

    if(!(await user.comparePassword(currentPassword))){
        return res.status(401).json({error:"Invalid username or password"});
    }

    user.password = newPassword;
    await user.save();

    console.log("Data updated");
    res.status(200).json({message:"Password Updated"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
