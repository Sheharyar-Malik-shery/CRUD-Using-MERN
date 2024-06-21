const UserDetail = require("../Models/user");
const fs = require("fs");
const path = require("path");
async function getUsers(req, res) {
  let data = await UserDetail.find({});
  if (data.length > 0) {
    res.status(200).json({ response: "success", UserData: data });
  } else {
    res.status(200).json({ response: "List is Empty" });
  }
}

async function updateUser(req, res) {
  const userId = req.params.id;
  const updates = req.body;
  const newProfileImage = req.file.filename;
  const user = await UserDetail.findById(userId);
  const oldProfileImage = user.profile;
  const oldImagePath = path.join(__dirname, "..", "uploads", oldProfileImage);
  if (fs.existsSync(oldImagePath)) {
    fs.unlink(oldImagePath, (err) => {
      if (err) {
        console.error("Error deleting old image file:", err);
      }
    });
  }
  updates.profile = newProfileImage;
  const updatedUser = await UserDetail.findByIdAndUpdate(userId, updates, {
    new: true,
  });
  res
    .status(200)
    .send({ response: "User updated successfully", user: updatedUser });
  // let updateProfile = await UserDetail.findByIdAndUpdate();
  // let id = req.params.id;
  // res.status(200).json({ response: "success", id: id });
}
async function deleteUser(req, res) {
  let deletedProfile = await UserDetail.findByIdAndDelete(req.params.id);
  let id = req.params.id;
  const profileImage = deletedProfile.profile;
  const imagePath = path.join(__dirname, "..", "uploads", profileImage);
  fs.unlink(imagePath, () => console.log("file deleted", profileImage));
  console.log(deletedProfile);
  res.status(200).send({ response: "success", id: deletedProfile });
}

async function newUser(req, res) {
  const profile = req.file.filename;
  let body = req.body;
  let data = {
    name: body.name,
    email: body.email,
    profile: profile,
  };
  await UserDetail.create(data);
  console.log(data);
  res.status(200).json({ response: "success", data: data });
}

module.exports = {
  getUsers,
  updateUser,
  deleteUser,
  newUser,
};
