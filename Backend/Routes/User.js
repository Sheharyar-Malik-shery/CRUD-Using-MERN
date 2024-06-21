const express = require("express");
let userRouter = express.Router();
const upload = require("../middleware/multerConfig");
let {
  getUsers,
  updateUser,
  deleteUser,
  newUser,
} = require("../controllers/user");

userRouter.get("/", getUsers);

userRouter.patch("/userUpdate/:id", upload.single("profile"), updateUser);

userRouter.delete("/deleteUser/:id", deleteUser);

userRouter.post("/newuser", upload.single("profile"), newUser);

module.exports = userRouter;
