import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

//yaha per cloudinary se jo info ayegi usko rakhna hai
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadOnCloudinary=async(localFilePath)=>{
    try{
        if (!localFilePath) return null
        //otherwise upload the file 
        const response=await cloudinary.uploader.upload(localFilePath,{resource_type:"auto"})
        //file has been uploaded successfully
        console.log("file is uploaded on cloudinary",response.url);
        return response;
    }
    catch(error){
        fs.unlinkSync(localFilePath)//remove the file fromm the local storage
        return null
    }
}

export {uploadOnCloudinary}