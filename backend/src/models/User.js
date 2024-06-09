// 6 passo
const mongoose = require("mongoose");
const bcrybt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrybt.genSalt(10);
  this.password = await bcrybt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', UserSchema);
