// const Express = require("express");
const { Express } = require("../server");
const { registerAdmin, authAdmin } = require("../controllers/adminControllers");

const router = Express.Router();
router.use(Express.json({ extended: true }));
router.use(Express.urlencoded({ extended: true }));

//Define admin related routes:-

router.post("/register", registerAdmin);
router.post("/login", authAdmin);

module.exports = router;
