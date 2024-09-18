import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

/**
 * @desc    Authenticate user by connecting Phantom wallet
 * @route   POST /api/users/login
 * @access  Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { walletAddress } = req.body;

  const user = await User.findOne({ walletAddress });

  if (user) {
    res.json({
      _id: user._id,
      walletAddress: user.walletAddress,
      freeSpins: user.freeSpins,
      paidSpins: user.paidSpins,
      spins: user.spins,
      playedSpins: user.playedSpins,
    });
  } else {
    res.status(401);
    throw new Error("User not registered");
  }
});

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { walletAddress, freeSpins } = req.body; // Get freeSpins from the request

  const userExists = await User.findOne({ walletAddress });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create the user with the specified freeSpins
  const user = new User({
    walletAddress,
    freeSpins: freeSpins,
    paidSpins: 0,
  });

  const createdUser = await user.save();

  if (createdUser) {
    res.status(201).json({
      _id: createdUser._id,
      walletAddress: createdUser.walletAddress,
      freeSpins: createdUser.freeSpins,
      paidSpins: createdUser.paidSpins,
      spins: createdUser.spins,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/**
 * @desc    Get user data
 * @route   GET /api/users/:walletAddress
 * @access  Public
 */
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ walletAddress: req.params.walletAddress });

  if (user) {
    res.json({
      _id: user._id,
      walletAddress: user.walletAddress,
      name: user.name,
      freeSpins: user.freeSpins,
      paidSpins: user.paidSpins,
      spins: user.spins,
      playedSpins: user.playedSpins,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private/Admin
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-__v");
  res.json(users);
});

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const { walletAddress, name } = req.body;

  const user = await User.findOne({ walletAddress });

  if (user) {
    // Update the user's name if provided
    if (name) {
      user.name = name;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      walletAddress: updatedUser.walletAddress,
      name: updatedUser.name,
      freeSpins: updatedUser.freeSpins,
      paidSpins: updatedUser.paidSpins,
      spins: updatedUser.spins,
      playedSpins: updatedUser.playedSpins,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

/**
 * @desc    Update user's spins
 * @route   PUT /api/users/spins
 * @access  Private
 */
const updateSpins = asyncHandler(async (req, res) => {
  const { walletAddress } = req.body;

  const user = await User.findOne({ walletAddress });

  if (user) {
    if (user.spins > 0) {
      if (user.freeSpins > 0) {
        user.freeSpins -= 1;
      } else if (user.paidSpins > 0) {
        user.paidSpins -= 1;
      }
      user.playedSpins += 1;
      await user.save();
      res.json({
        spins: user.spins,
        playedSpins: user.playedSpins,
      });
    } else {
      res.status(400);
      throw new Error("No spins left");
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  getUser,
  getAllUsers,
  updateUserProfile,
  updateSpins,
};
