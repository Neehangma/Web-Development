import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { secrete_key } from '../utils/constant.js';

export const verifyUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        // "Bearer ddcknmcbjfiowlek".split(" ") // -> ["Bearer", "ddcknmcbjfiowlek"]
        const accessToken = authHeader && authHeader.split(" ")[1];
        if (!accessToken) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }
        const payload = jwt.verify(accessToken, secrete_key)
        const user = User.findOne({
            where: {
                _id: payload._id
            }
        });
        if(user){
        //line no 21 is important line
        req.user = user;
        next()
        }
        else{
            res.status(401).json({message: "Unauthorized", success: false});
        }
    } catch (error) {
        res.status(500).json({ message: "Not authorized", success: false });
    }
}