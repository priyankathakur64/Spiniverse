import express from "express";
import {
  authUser,
  registerUser,
  getUser,
  getAllUsers,
  updateSpins,
  updateUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(authUser);
router.route("/:walletAddress").get(getUser);
router.route("/").get(getAllUsers);
router.route("/spins").put(updateSpins);
router.route("/profile").put(updateUserProfile);

export default router;
