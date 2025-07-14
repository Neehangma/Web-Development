import User from '../models/User.js';
import { validateRegistration } from '../middleware/validation.js';

/*
step 1 : import model/user.js
step 2: function registerController
step 3: body bata data ligne
step 4: validate garne
step 5: email validation 
step 6: password encrypt
step 7: insert database 
step 8: response
;*/
async function  registerController(req, res) {
    try {
      console.log(' request received:', req.body);

      // Step 1: Validate the form data
      const { error, value } = validateRegistration(req.body);
      if (error) {
        console.log('ValidaRegistrationtion errors:', error.details);
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: error.details.map(detail => detail.message)
        });
      }

      const { firstName, lastName, email, phoneNumber, country, dateOfBirth, password } = req.body;

      // Step 2: Check if user already exists
      // 
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        console.log('User already exists with email:', email);
        return res.status(409).json({
          success: false,
          message: 'User already exists with this email address'
        });
      }

      // Step 3: Create new user (password will be hashed automatically)
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        country,
        dateOfBirth,
        password
      });

      console.log('User created successfully:', newUser.id);

      // Step 4: Send success response (without password)
      const userResponse = {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        country: newUser.country,
        dateOfBirth: newUser.dateOfBirth,
        createdAt: newUser.created_at
      };

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: userResponse
        }
      });

    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle database errors
      if (error.name === 'SequelizeValidationError') {
        const validationErrors = error.errors.map(err => err.message);
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: validationErrors
        });
      }

      // Handle unique email error
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({
          success: false,
          message: 'Email address is already registered'
        });
      }

      // General error
      res.status(500).json({
        success: false,
        message: 'Internal server error during registration'
      });
    }
  }


export  {registerController};
//query,