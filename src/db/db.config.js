import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { DB_NAME } from '../constants.js';

dotenv.config();
 
export const connectDB= async()=>{
        try{
            const connection=await mongoose.connect(`${process.env.MONGO_URI}`)
            console.log(`MongoDB connected HostName:${connection.connection.host}`);


        }
        catch(error){
            console.error("error connecting to mongo DB",error);
            process.exit(1);
        }
}