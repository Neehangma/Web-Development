// /*
// step 1 : import model/user.js
// step 2: function registerController
// step 3: body bata data ligne
// step 4: validate garne
// step 5: email check if exits or not 
// step 6: password encrypt
// step 7: insert database 
// step 8: response
// ;*/

// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// export const registerC = async (req, res) => {
//     try{
//    const {firstName, lastName, country, email, password, phoneNumber,dateOfBirth} = req.body;

//    if(!firstName||!lastName||!country||!email||!password||!phoneNumber||!dateOfBirth){
//     return res.json({message: "All field must be filled", success: false});
//    }

//    const isEmailExist = await User.findOne({
//     where:{
//         email:email,
//     }
//    })
//    if(isEmailExist){
//     return res.json({message: "Email already Exist", success: false});
//    }

//    const hashedPassword = bcrypt.hash(password,20)

//    await User.create({
//     firstName:firstName,
//     lastName:lastName,
//     country: country,
//     email: email,
//     password:hashedPassword,
//     phoneNumber: phoneNumber,
//     dateOfBirth:dateOfBirth
//    })
//    return res.json({message:"Register Successfull", success: true})
// } catch(error){
//     return res.json({
//         message:error,
//         success: false
//     })
// }
// }

//  /*
// import model
// email and password bogy bata ligne
// validate email and password
// database ma email search garera users ko whole data ligne
// database ma vako email and password lai user le deko emailand password check garne
// res sent garna
// */

// export const loginC = async(req,res) => {
//     try {
//         const {email, password} = req.body;
//         if(!email || !password){
//             return res.json({message: "Both field must be filled", success:false});
//         }

//         const userDetails = await User.findOne({
//             where:{
//                 email: email
//             }
//         })
//         if(!userDetails){
//             return res.json({message: "You are not register yet", success: false})
//         }

//         const hashedP = await bcrypt.compare(password, userDetails.password);

//         if(!hashedP){
//             return res.json({message: "Login failed", success:false});
//         }

//         return res.json({message: "Login Successfull", success: true});
//     } catch (error) {
//         return res.json({message: error, success:false});
//     }
// }