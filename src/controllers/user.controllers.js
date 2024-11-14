import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiErrors } from "../utils/ApiErrors.js";
import User  from "../models/user.model.js";
import { uplodeOnCloudinary } from "../utils/cloudinary.js";
import { Op } from "sequelize";
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, fullname, password } = req.body;
  console.log(email, ":::::::::::::email::::::");
  if (
    [username, email, fullname, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiErrors(400, "All field are required");
  }

  const existedUser = await User.findOne({
    where: {
      [Op.or]: [{ username }, { email }],
    },
  });
  if (existedUser) {
    throw new ApiErrors(409, "user with email or username already exist");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  //  const coverImageLocalPath  = req.files?.coverImage[0]?.path ;

  let coverImageLocalPath;

  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiErrors(400, "Avatar file is required");
  }

  const avatar = await uplodeOnCloudinary(avatarLocalPath);
  const coverImage = await uplodeOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiErrors(400, "Avatar file is required");
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
  const createdUser = await User.findByPk(user.id);
  if (!createdUser) {
    throw new ApiErrors(500, "somthing went wrong while registring the user");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered Successfully"));
});

export { registerUser };
