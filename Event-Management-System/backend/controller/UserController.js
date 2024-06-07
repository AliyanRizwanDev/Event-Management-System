import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    const user = await User.signup(firstName, lastName, email, password, role);
    const token = createToken(user._id);

    const userData = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      token,
    };

    res
      .status(201)
      .json({ message: "User created successfully", user: userData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    const userData = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      token,
    };
    res
      .status(201)
      .json({ message: "User logged in successfully", user: userData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const profileView = async (req, res) => {
  const userId = req.params.id;
  try {
    const userProfile = await User.findById(userId);
    if (!userProfile) {
      return res.status(404).json({ error: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User profile retrieved successfully", userProfile });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const profileEdit = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const { id } = req.params;
  try {
    const updatedProfile = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, email },
      { new: true }
    );
    if (!updatedProfile) {
      return res.status(404).json({ error: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User profile updated successfully", updatedProfile });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const profileDelete = async (req, res) => {
  const userId = req.params.id;
  try {
    const userProfile = await User.findByIdAndDelete(userId);
    if (!userProfile) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User profile Deleted", userProfile });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updatePassword = async (req, res) => {
  const userId = req.params.id;
  const { password, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProfiles = async (req, res) => {
  try {
    const profiles = await User.find();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
