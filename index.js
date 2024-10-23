
import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import mainRouter from './routes/indexRoute.js';
import authJwt from './config/jwt.js';
import errorHandler from './config/error-handler.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// cors config
const corsOptions = {
  origin: true,
  methods: ['GET','POST','DELETE','PUT'],
  credentials: true,
  optionSuccessStatus: 200
};
app.use(cookieParser())
// Middleware
app.use(express.json()); 
// app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(authJwt())

// connect to database
connectDB();

//Routes
app.use('/api',mainRouter);

//always place error handler middleware at the end of the stack
app.use(errorHandler)

//Start the server
app.listen(PORT, () => {
  console.log(`The app listening on port ${PORT}`)
})