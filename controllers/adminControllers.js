const { app } = require("../server");

const asyncHandler = require("express-async-handler");
const AdminModel = require("../models/adminModel");

const CookieParser = require("cookie-parser");
app.use(CookieParser());

const Bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken");

const registerAdmin = asyncHandler(async (req, res) => {
  const { username, password, pic } = req.body;

  //If the admin with this 'username' already exists or not in the 'admins' collection.
  const adminExists = await AdminModel.findOne({ username });

  if (adminExists !== null) {
    throw new Error(
      `${adminExists.username}, admin already exists in the DataBase`
    );
  }

  //Otherwise, create a new 'admin' document inside the 'admins' collection.
  const hashedPasswordWithSalt = await Bcrypt.hash(password, 12);

  const AdminData = new AdminModel({
    username,
    password: hashedPasswordWithSalt,
  });

  AdminData.save()
    .then((doc) => {
      const actualToken = generateToken(doc._id);
      res.cookie("token", actualToken);

      res.status(201).json(doc.select("-password"));
    })
    .catch((err) => {
      res.status(500);
      throw new Error("Admin could not be created");
    });
});

const authAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const adminExists = await AdminModel.findOne({ username });

  if (adminExists !== null) {
    //email is verified, Now verify the password.
    const actualPassword = adminExists.password;

    const confirmationOutput = await Bcrypt.compare(password, actualPassword);

    if (confirmationOutput) {
      //Generating the JWT token for the logged-In admin.
      const actualToken = generateToken(adminExists._id);

      //Sending the token to the browser.
      res.cookie("token", actualToken);

      // Exclude the password field from the response
      adminExists.password = undefined;

      res.status(201).send(adminExists);
    } else {
      res.status(500);
      throw new Error("Invalid Password !!!");
    }
  } else {
    res.status(500);
    throw new Error("Invalid Email !!!");
  }
});

module.exports = { registerAdmin, authAdmin };
