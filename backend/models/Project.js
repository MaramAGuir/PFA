// models/Project.js
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  startDate: Date,
  endDate: Date,
  teamMembers: Number,
});

module.exports = mongoose.model("Project", projectSchema);
