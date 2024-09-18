import mongoose from "mongoose";

const rewardSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    prizes: [
      {
        name: { type: String },
        qty: { type: Number, default: 0 },
      },
    ],
    earnings: {
      type: Number,
      default: 0,
    },
    wonAt: {
      type: Date,
    },
    isClaimed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Reward = mongoose.model("Reward", rewardSchema);

export default Reward;
