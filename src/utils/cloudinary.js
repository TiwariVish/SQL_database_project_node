import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET, // Click 'View API Keys' above to copy your API secret
});

const uplodeOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // uplode the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been upload successfull
    console.log("File is uplode Successfull in Cloudinary", response.url);
    fs.unlinkSync(localFilePath); 
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove the  locally saved  tempary file as the uplode opration got fail
    return null;
  }
};

export { uplodeOnCloudinary };
