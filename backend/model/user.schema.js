import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full Name is required"],
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: [8, "Password must at lest 8 character"],
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      index: true,
    },
    phone: {
      type: String,
      required: true,
    },
    aboutMe: {
      type: String,
      required: true,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    resume: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    iAm: [
      {
        type: String,
      },
    ],
    portfolioUrl: String,
    githubUrl: String,
    instagramUrl: String,
    linkedInUrl: String,
    refreshToken: {
      type: String,
      select: false,
    },
    resetToken: {
      type: String,
      select: false,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
    },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.TOKEN_EXPIREY,
    },
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIREY,
    },
  );
};

userSchema.methods.generateResetToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_RESET_TOKEN_SECRET,
    {
      expiresIn: process.env.RESET_TOKEN_EXPIREY,
    },
  );
};

export const User = mongoose.model("User", userSchema);
