import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    walletAddress: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      default: "",
    },
    freeSpins: {
      type: Number,
      required: true,
      default: 1,
    },
    paidSpins: {
      type: Number,
      required: true,
      default: 0,
    },
    spins: {
      type: Number,
      default: 0,
    },
    playedSpins: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Pre-save middleware to update the spins field
userSchema.pre("save", function (next) {
  this.spins = this.freeSpins + this.paidSpins;
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
