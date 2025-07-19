import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { connectDB } from './db/db.config.js';
import express from 'express';
dotenv.config();
const app = express();
connectDB();
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})
