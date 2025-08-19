import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";

import {uploadOnCloudinary} from "../utils/Cloudinary.js";
import {User} from '../models/user.model.js';
import { ApiResponse } from "../utils/ApiResponse.js";
 
 const registerUser=asyncHandler(async(req,res)=>{
 
 const {fullname,username,email,password}=req.body;
    if(
        [fullname,email,username,password].some((field)=>field?.trim()=="")
     ) 
     {
            throw new ApiError(400,"all fields are required")
        }
   const existingUser= User.findOne({$or:[{ username },{ email }]})
   if(existingUser){
    throw new ApiError(409,"user with  this email and username is laready exist ")
   }
   const avatarLocalPath=req.files?.avatar[0]?.path;
   const coverImageLocalPath=req.file?.coverImage[0]?.path

   if(!avatarLocalPath){
    throw new ApiError(400,"Avatar files is required")
   }
   const avatar=await uploadOnCloudinary(avatarLocalPath)
   const coverImage=await uploadOnCloudinary(coverImageLocalPath)
   if(!avatar){
    throw new ApiError(400,"Avatr is required")
   }

  const user =await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url||"",
    email,
    password,
    username:username.toLowerCase()
   })

   const createdUser=await User.findById(user._id).select(
    "-password -refreshToken"
   )

   if(!createdUser){
    throw new ApiError(500,"something went wrong while creating user")
   }

   return res.status(201).json(
    new ApiResponse(200,createdUser,"user registered successfully")
   )
 })

export {registerUser}