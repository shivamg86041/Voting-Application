const jwt = require("jsonwebtoken");
require('dotenv').config();

const jwtAuthMiddleware = (req, res, next) => {

    // first check requrest headers has authorization or not
    const authorization = req.headers.authorization;
    if(!authorization) return res.status(401).json({error:"Token not found"});
    
  //Extract the jwt token from the request header
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "unauthorised" });

  try {
    //verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to the request object
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid token" });
  }
};

//function to generate jwt token
const generateToken = (userData) =>{
    return jwt.sign(userData, process.env.JWT_SECRET);
}

module.exports = {jwtAuthMiddleware, generateToken};