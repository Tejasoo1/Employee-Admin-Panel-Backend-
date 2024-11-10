const Express = require("express");
const app = Express();
const AdminModel = require("../models/adminModel");
const JWT = require("jsonwebtoken");

async function VerifyToken(req, res, next) {
  const fetchedToken = req?.cookies?.token || "";

  // console.log({ fetchedToken });
  // console.log(req?.cookies?.token);

  if (!fetchedToken) {
    res.status(400).send("cookie (token) is not sent !!!");
  } else {
    try {
      const decoded = JWT.verify(fetchedToken, process.env.JWT_SECRET);
      // console.log(decoded);
      req.user = await AdminModel.findById(decoded.docID).select("-password");
      // console.log(req.user);
      next();
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(401).send("Invalid token");
    }
  }
}

module.exports = VerifyToken;
