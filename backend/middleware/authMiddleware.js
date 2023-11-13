import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Protect routes
const protect = async (req, res, next) => {
  let token;

  // Read the JWT from the cookie
  token = req.cookies.jwt;
  if(token){
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password');
      next();
    } catch (error) {
      console.log(error)
      res.status(401).json({error: error.message});
    }
  } else{
    res.status(401).json({error: 'not Authoraized, No token'})
  }
};

//Admin Middleware
const admin = (req, res, next) => {
  if(req.user && req.user.isAdmin){
    next();
  } else {
    res.status(401).json('not Authorized as admin');
  }
}

export { protect, admin };