import bcryptjs from "bcryptjs";
import User from "./../models/user";
import jwt from "jsonwebtoken";
import createError from "../utils/errors";

export const register = async (req, res,next) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    // return res.json("required field username, email, password");
    return next(createError({status:401,message:'Name, email, password is required'}))
  }

  try {
    const body = req.body;

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(body.password, salt);

    const newUser = new User({
      username: body.username,
      email: body.email,
      password: hashedPassword,
    });
    await newUser.save();
    const {password, ...rest} = newUser;
    console.log(rest)
    return res.status(201).send(rest._doc);
    // return newUser;
  } catch (error) {
    console.log(error);
    // return res.send("Server error");
    return next(createError({status:401,message:'Name, email, password is required'}))
  }
};

export const login = async (req, res,next) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    // return res.json("required field username, email, password");
    return next(createError({status:401,message:'Name, email, password is required'}))
  }

  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "username email password"
    );
    if (!user) {
      // return res.status(404).send("No user found");

      return next(createError({status:404,message:'NO user found'}))
    }
    const isPasswordCorrect = await bcryptjs.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(createError({status:400,message:'Password is in correct'}))
    }
    const payload = {
      id: user._id,
      name: user.username,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .send({ message: "Login successfull" });
  } catch (error) {
    return next(createError({status:401,message:'Name, email, password is required'}))
  }
};


export const logout = (req,res) =>{
  console.log('hello')
  res.clearCookie('access_token');
  return res.status(200).json({message:'Logout successfull'})
}


export const isLoggedIn = () =>{

  const token = req.cookies.access_token;
  if(!token){
    return res.json(false);
  };
  return jwt.verify(token,process.env.JWT_SECRET,(err)=>{
    if(err){
      return res.json(false);
    }
    else{
      return res.json(true);
    }
  }

};