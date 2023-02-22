import jwt from "jsonwebtoken";
import createError from "./errors";


export default (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) { 
    // return res.send("No token available");
    return next(createError({ status: 401, message: "unauthorized" }));
  }

  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(createError({ status: 401, message: "Invalid Token" }));
    } else {
      req.user = decoded;
      return next();
     
    }
  });
};


