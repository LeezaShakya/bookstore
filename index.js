
import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import mainRouter from './routes/indexRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// cors config
const corsOptions = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200
};

// Middleware
app.use(express.json()); 
app.use(cors(corsOptions));

// connect to database
connectDB();

//Routes
app.use('/api',mainRouter);

//Start the server
app.listen(PORT, () => {
  console.log(`The app listening on port ${PORT}`)
})