var bcrypt = require("bcrypt");
var mongoose = require("mongoose");

var SALT_FACTOR = 10;

var userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  displayName: String,
  bio: String,
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(SALT_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.checkPassword = function (guess) {
  return bcrypt.compare(guess, this.password);
};

userSchema.methods.name = function () {
  return this.displayName || this.username;
};

var User = mongoose.model("User", userSchema);
module.exports = User;