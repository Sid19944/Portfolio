import { User } from "../model/user.schema.js";
import ErrorHandler from "../utils/errorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { v2 as cloudinary } from "cloudinary";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendMail } from "../utils/mail.service.js";

const generateTokenAndRefreshToken = async (user, next) => {
  try {
    const accessToken = await user.generateToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save();
    return { accessToken, refreshToken };
  } catch (err) {
    return next(
      new ErrorHandler(
        `Error while generating the Token and RefreshToken, ${err}`,
        500
      )
    );
  }
};

const registerUser = asyncHandler(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Avatar And Resume are required", 400));
  }

  const { avatar, resume } = req.files;
  const cloudinaryResForAvatar = await cloudinary.uploader.upload(
    avatar.tempFilePath,
    {
      folder: "AVATAR",
    }
  );

  if (!cloudinaryResForAvatar || cloudinaryResForAvatar.error) {
    console.error(
      `Cloudinary Error`,
      cloudinaryResForAvatar.error || "Unknow Error from cloudinary"
    );
  }

  const cloudinaryResForResume = await cloudinary.uploader.upload(
    resume.tempFilePath,
    {
      folder: "RESUME",
    }
  );

  if (!cloudinaryResForResume || cloudinaryResForResume.error) {
    console.error(
      `Cloudinary Error`,
      cloudinaryResForResume.error || "Unknow Error from cloudinary"
    );
  }

  const { fullName, username, password, email, phone, aboutMe } = req.body;

  if (!fullName || !username || !password || !email || !phone || !aboutMe) {
    return next(new ErrorHandler("All feild are Required", 400));
  }

  if (
    [fullName, username, password, email, phone, aboutMe].some(
      (field) => field?.trim() === ""
    )
  ) {
    return next(new ErrorHandler("All feild are Required", 400));
  }

  const user = await User.create({
    fullName,
    username: username.toLowerCase(),
    password,
    email: email.toLowerCase(),
    phone,
    aboutMe,
    avatar: {
      public_id: cloudinaryResForAvatar.public_id,
      url: cloudinaryResForAvatar.secure_url,
    },
    resume: {
      public_id: cloudinaryResForResume.public_id,
      url: cloudinaryResForResume.secure_url,
    },
  });

  if (!user || user?.error) {
    return next(
      new ErrorHandler(`something wrong while Regster the USER ${error}`)
    );
  }

  return res.status(httpStatus.CREATED).json({
    success: true,
    message: "User Created Successfully",
    username: user.username,
  });
});

const loginUser = asyncHandler(async (req, res, next) => {
  console.time("START")
  const { email, password } = req.body;
  console.timeEnd("START")
  if (!(email && password)) {
    return next(new ErrorHandler("Email and Password is required"));
  }

  if ([email, password].some((field) => field?.trim() === "")) {
    return next(new ErrorHandler("Email and Password is required"));
  }

  console.time("DB_FIND")
  const user = await User.findOne({ email: email.toLowerCase() })
  console.timeEnd("DB_FIND")
  if (!user) {
    return next(new ErrorHandler("Invalid Email ID", 400));
  }
  console.time("PASS")
  const isPasswordCorrect = await user.isPasswordCorrect(password)
  console.timeEnd("PASS")

  if (!isPasswordCorrect) {
    return next(new ErrorHandler("Invalid Password", 400));
  }

  const { accessToken, refreshToken } = await generateTokenAndRefreshToken(
    user
  );
  user.password = null;

  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 12 * 60 * 60 * 1000),
      sameSite: "none",
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      sameSite: "none",
    })
    .json({
      user,
      accessToken: accessToken,
      refreshToken: refreshToken,
      message: "User Logged in successfylly",
      success: true,
    });
});

const logoutUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, {
    $unset: {
      refreshToken: 1,
    },
  });
  return res
    .status(200)
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      message: "User Logged out successfully",
    });
});

const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne();
  if (!user) {
    return next(new ErrorHandler("User did't found, Login Again", 401));
  }
  return res.status(200).json({
    success: true,
    message: "User found seccessfully",
    user: user,
  });
});

const updateProfile = asyncHandler(async (req, res, next) => {
  const newUserData = {
    fullName: req.body.fullName?.trim(),
    username: req.body.username?.toLowerCase()?.trim(),
    email: req.body.email?.toLowerCase()?.trim(),
    phone: req.body.phone?.trim(),
    aboutMe: req.body.aboutMe?.trim(),
    portfolioUrl: req.body?.portfolioUrl?.trim(),
    githubUrl: req.body?.githubUrl?.trim(),
    instagramUrl: req.body?.instagramUrl?.trim(),
    linkedInUrl: req.body?.linkedInUrl?.trim(),
  };
  // if avatar is availabel then updata
  if (req.files && req.files.avatar) {
    const avatar = req.files.avatar;
    const user = await User.findById(req.user._id);
    const avatarPublic_id = user.avatar.public_id;
    await cloudinary.uploader.destroy(avatarPublic_id);
    const cloudinaryResForAvatar = await cloudinary.uploader.upload(
      avatar.tempFilePath,
      {
        folder: "AVATAR",
      }
    );

    newUserData.avatar = {
      public_id: cloudinaryResForAvatar.public_id,
      url: cloudinaryResForAvatar.secure_url,
    };
  }
  // if resume is availabel then updata
  if (req.files && req.files.resume) {
    const resume = req.files.resume;
    const user = await User.findById(req.user._id);
    const resumePublic_id = user.resume.public_id;
    await cloudinary.uploader.destroy(resumePublic_id);
    const cloudinaryResForResume = await cloudinary.uploader.upload(
      resume.tempFilePath,
      {
        folder: "RESUME",
      }
    );

    newUserData.resume = {
      public_id: cloudinaryResForResume.public_id,
      url: cloudinaryResForResume.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
    new: true,
  });

  // console.log(user);
  return res.status(200).json({
    success: true,
    message: "User data updated successfully",
    user,
  });
});

const updatePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  // console.log(req.body)
  if (!(currentPassword && newPassword && confirmNewPassword)) {
    return next(new ErrorHandler("Please Fill Full Form", 400));
  }
  if (
    [currentPassword, newPassword, confirmNewPassword].some(
      (field) => field?.trim === ""
    )
  ) {
    return next(new ErrorHandler("Please Fill Full Form", 400));
  }

  if (newPassword !== confirmNewPassword) {
    return next(
      new ErrorHandler("new password and confirm password is not same", 400)
    );
  }

  const user = await User.findById(req.user._id)
  const isPasswordCorrect = await user.isPasswordCorrect(currentPassword)
  if (!isPasswordCorrect) {
    return next(new ErrorHandler("Wrond password", 400));
  }

  user.password = newPassword;
  await user.save();
  return res.status(200).json({
    success: true,
    message: "Password Updated Successfully",
  });
});

const refreshAccessToken = asyncHandler(async (req, res, next) => {
  const accessToken =
    req?.cookies?.accessToken ||
    req?.header("Authorization")?.replace("Bearer", "");

  if (!accessToken) {
    const incommingRefreshToken =
      req?.cookies?.refreshToken || req?.body?.refreshToken;

    if (!incommingRefreshToken) {
      return next(new ErrorHandler("Refresh token not found", 400));
    }

    const decodedRefreshToken = await jwt.verify(
      incommingRefreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET
    );

    if (!decodedRefreshToken) {
      return next(new ErrorHandler("Invalid refresh token", 400));
    }

    const user = await User.findById(decodedRefreshToken._id);
    if (!user) {
      return next(
        new ErrorHandler("Invalid refresh token, Please login again")
      );
    }
    const newAccessToken = await user.generateToken();

    return res
      .status(httpStatus.CREATED)
      .cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 12 * 60 * 60 * 1000),
        sameSite: "none",
      })
      .json({
        success: true,
        message: "Access Token refreshed successfully",
        accessToken: newAccessToken,
      });
  }
  return next(new ErrorHandler("Your access token is not expires yet"));
});

const getUserForPortfolio = asyncHandler(async (req, res, next) => {
  const id = "695a5d6cc2633209ea0bbacf";
  const user = await User.findById(id);
  if (!user) {
    return next(
      new ErrorHandler(
        "Internal server error",
        httpStatus.INTERNAL_SERVER_ERROR
      )
    );
  }
  return res.status(200).json({
    success: true,
    message: "User found Successfully",
    user: user,
  });
});

const SendForgotPasswordLink = asyncHandler(async (req, res, next) => {
  // console.log(req.body);
  const { email } = req.body;

  if (!email || email.trim() === "") {
    return next(new ErrorHandler("Please enter a valid email", 400));
  }

  const user = await User.findOne({ email: email?.toLowerCase() });
  if (!user) {
    return next(new ErrorHandler("Invalid Email ID"));
  }

  const resetToken = await user.generateResetToken();
  if (!resetToken) {
    return next(
      new ErrorHandler("Something wrong while generating reset token")
    );
  }
  user.resetToken = resetToken;
  await user.save({ validateBeforeSave: false });

   sendMail({
    sender: email?.toLowerCase(),
    subject: "Forget Password",
    message: `<h1>Froget your password by <br><br> <a href="${process.env.DASHBOARD_URL}/forgot/password/${resetToken}">  click here </a> <br> Link valid for 5 minutes only</h1>`,
  });

  return res.status(200).json({
    success: true,
    message: `Reset link successfylly send to ${email?.toLowerCase()}, valid for 5 minute only`,
  });
});

const setNewForgotPassword = asyncHandler(async (req, res, next) => {
  const { resetToken } = req.params;
  // console.log(req.body);
  const { newPassword, confirmPassword } = req.body;
  if (
    !(newPassword && confirmPassword) &&
    [newPassword, confirmPassword].some((field) => field?.trim() === "")
  ) {
    return next(new ErrorHandler("Enter new Password and Confirm  Password"));
  }

  if (newPassword !== confirmPassword) {
    return next(
      new ErrorHandler("New Password and confirm  Password doesn't match")
    );
  }
  const decodedResetToken = await jwt.verify(
    resetToken,
    process.env.JWT_RESET_TOKEN_SECRET
  );

  if (!decodedResetToken) {
    return next(new ErrorHandler("Invalid reset token or expiry token"));
  }
  // console.log("decoded data", decodedResetToken);

  const user = await User.findById(decodedResetToken._id);
  if (!user) {
    return next(new ErrorHandler("Invalid reset token or  user not found"));
  }

  user.password = newPassword;
  await user.save();

  return res
    .status(200)
    .json({ message: "Password updated successfully", success: true });
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateProfile,
  updatePassword,
  refreshAccessToken,
  getUserForPortfolio,
  SendForgotPasswordLink,
  setNewForgotPassword,
};
