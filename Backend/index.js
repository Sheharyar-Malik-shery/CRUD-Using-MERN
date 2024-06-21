const userRouter = require("./Routes/User");
const express = require("express");
const cors = require("cors");
const mongooseconnection = require("./Dbconnection");
const path = require("path");
mongooseconnection("mongodb://localhost:27017/UserProfiles");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(8080, () => console.log("Started"));
