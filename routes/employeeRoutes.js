// const Express = require("express");
const { Express } = require("../server");
const {
  createEmployee,
  updateEmployee,
  getAllEmployees,
  deleteEmployee,
  doesEmployeeEmailExists,
} = require("../controllers/employeeControllers");

const VerifyToken = require("../middleware/authMiddleware");

const router = Express.Router();
router.use(Express.json({ extended: true }));
router.use(Express.urlencoded({ extended: true }));

//Define admin related routes:-
router.post("/create/employee", VerifyToken, createEmployee);
router.put("/update/employee", VerifyToken, updateEmployee);
router.get("/get/allemployees", VerifyToken, getAllEmployees);
router.delete("/delete/employee/:empID", VerifyToken, deleteEmployee);
router.post("/check/emailexists", VerifyToken, doesEmployeeEmailExists);

module.exports = router;
