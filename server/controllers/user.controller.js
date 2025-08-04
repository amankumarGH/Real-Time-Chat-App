import mongoose from "mongoose";
import { User } from "../models/user.Model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({
        message: "All Fields are required",
        success: false,
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password do not match",
        success: false,
      });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({
        message: "UserName Already exist try different",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    await User.create({
      fullName,
      username,
      password: hashedPassword,
      profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
      gender,
    });

    return res.status(201).json({
      success: true,
      message: "User register SuccessFully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(402).json({
        success: false,
        message: "Incorrect Username or password",
      });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.status(402).json({
        success: false,
        message: "Incorrect Username or password",
      });
    }

    const tokenData = {
      userId: user._id,
      username: user.username,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1hr",
    });

    return res
      .status(200)
      .cookie("Token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 3600000,
      })
      .json({
        _id: user._id,
        username: user.username,
        profilePhoto: user.profilePhoto,
        fullName: user.fullName,
        message: "Login Successful",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("Token", "", { maxAge: 0 }).json({
      message: "Logged Out successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOtherUsers = async (req, res) => {
  try {
    const loggedInUserId = req.id;
    //ne==not equal to
    const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );
    return res.status(200).json(otherUsers);
  } catch (error) {
    console.log(error);
  }
};

export const removeUser = async (req, res) => {
  try {
    const username = req.params.username;

    const user = await User.findOneAndDelete({ username });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error deleting user",
    });
  }
};
