import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/loginRoute.js';
import { db } from './config/database.js';
import loginRoutes from './routes/loginRoute.js';
import registerrouter from './routes/registerRoute.js';
import { port } from './utils/constant.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT =  3001;


// Middleware
app.use(cors());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initialize database connection
db();

// ONLY ONE ROUTE - Registration
app.use('/api/users', loginRoutes);
app.use("/api/users", registerrouter);



// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});





































