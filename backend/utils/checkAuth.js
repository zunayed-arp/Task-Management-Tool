import jwt from "jsonwebtoken";
import handleError from "./errors";

const checkAuth = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) { 
    return next(handleError({ status: 401, message: "unauthorized" }));
  }

  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.send("Invalid Token");
    } else {
      req.user = decoded;
      return next(handleError({ status: 401, message: "Invalid Token" }));;
    }
  });
};

export default checkAuth;
