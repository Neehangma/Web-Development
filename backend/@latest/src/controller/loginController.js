import {sequelize} from "../config/database.js";
import bcrypt from "bcryptjs";
import User from '../models/User.js';
import jwt from "jsonwebtoken";
import { secrete_key } from "../utils/constant.js";

export const loginController = async(req,res) => {
   /*
import model
email and password bogy bata ligne
validate email and password
database ma email search garera users ko whole data ligne
database ma vako email and password lai user le deko emailand password check garne
res sent garna
*/
   try {
     const {email, password} = req.body;
     
     const user = await User.findOne({email});
     if(!user){
        res.status(400).json({message:"All field are required"});
     }

     //Compare password
     const isPasswordValid = await bcrypt.compare(password, user.password);
     if(!isPasswordValid){
        res.status(401).json({message: "Invalid email or password"});
     }
     const _id = user._id;
     const accessToken = jwt.sign({_id}, secrete_key);
     res.status(200).json({
        message: "Login Successfull",
        user: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            country: user.country,
            phoneNumber: user.phoneNumber
        },
        accessToken
     })
    

   } catch (error) {
      console.error("Login Failed", error);
      res.status(500).json({message:"Server error"});
   }

};