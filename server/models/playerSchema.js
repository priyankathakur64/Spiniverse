import mongoose from "mongoose";
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  userId: String,
  totalSpins: Number,
  totalWins: Number,
  totalLosses: Number,
  averageSpinOutcome: Number
});

playerSchema.methods.calculateWinRate = function() {
  if (this.totalSpins === 0) return 0;
  return (this.totalWins / this.totalSpins) * 100;
};

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
