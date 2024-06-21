const mongoose = require("mongoose");

let userProfile = new mongoose.Schema({
  profile: {
    type: String,
    require: true,
    unique: true,
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
});

let UserDetail = mongoose.model("UserDetail", userProfile);

module.exports = UserDetail;
