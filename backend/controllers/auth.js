import bcryptjs from "bcryptjs";
import User from "./../models/user";
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.json("required field username, email, password");
  };

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
    return res.status(201).json("NEW USER CREATED");
  } catch (error) {
    console.log(err);
    return res.send("Server error");
  }
};

export const login = async (req,res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.json("required field username, email, password");
  };

  try {
    const user = await User.findOne({email: req.body.email}).select({
      'username email password'});
      if(!user){
        return res.status(404).send("No user found");
      }
      const isPasswordCorrect = await bcryptjs.compare(req.body.password,user.password);
      if(!isPasswordCorrect){
        return res.send("password incorrect")
      };
      const payload = {
        id:user._id,
        name:user.username
      }
      const token = jwt.sign(payload,process.env.JWT_TOKEN,{expiresIn: '1d'});
      return res.cookie('access_token',token,{
        httpOnly:true
      }).status(200).send({message:'Login successfull'})

  } catch (error) {
    
  }
};
