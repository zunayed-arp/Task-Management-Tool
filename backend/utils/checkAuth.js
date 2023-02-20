import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.send("no token available");
  }

  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.send("Invalid Token");
    } else {
      req.user = decoded;
      return next();
    }
  });
};

export default checkAuth;
