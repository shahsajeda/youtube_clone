import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './db/db.config.js';
import { app } from './app.js';
dotenv.config();

connectDB()
.then(()=>{
    app.listen(process.env.PORT||5000,() =>{
        console.log(`server is running on port: ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("mongo db conecction fsiled",err);
})
