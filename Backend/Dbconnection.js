const mongoose = require("mongoose");

function mongooseconnection(url) {
  mongoose
    .connect(url)
    .then(() => console.log("Database connected"))
    .catch(() => console.log("Some thing went wrong"));
}
module.exports = mongooseconnection;
