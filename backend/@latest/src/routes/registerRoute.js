import express from 'express';
import {registerController} from '../controllers/registerController.js';

const registerrouter = express.Router();

// ONLY ONE ROUTE - Register new user
registerrouter.post('/register',registerController);


export default registerrouter;