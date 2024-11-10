const EmployeeModel = require("../models/employeeModel");
const { app } = require("../server");

const getAllEmployees = async (req, res) => {
  try {
    const allEmployeeData = await EmployeeModel.find();

    res.status(200).send(allEmployeeData);
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .send("Internal server Error, can not fetch all employees data !!!");
  }
};

const doesEmployeeEmailExists = async (req, res) => {
  const { email } = req.body;

  try {
    const empExists = await EmployeeModel.findOne({ email });
    if (empExists) {
      return res.status(200).send({ emailExists: true });
    } else {
      return res.status(200).send({ emailExists: false });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal Server Error !!!");
  }
};

const createEmployee = async (req, res) => {
  const { name, email, mobileNo, gender, designation, course, pic } = req.body;

  const empExists = await EmployeeModel.findOne({ email });
  if (empExists) {
    return res.status(500).json({
      error: "Employee Already Exists",
      code: "EMP_EXISTS",
      details: {
        email: email,
        message: "An employee with this email is already registered.",
      },
    });
  }

  try {
    const empExists = await EmployeeModel.findOne({ email });
    if (empExists) {
      return res.status(500).json({
        error: "Employee Already Exists",
        code: "EMP_EXISTS",
        details: {
          email: email,
          message: "An employee with this email is already registered.",
        },
      });
    }

    const courses = Array.isArray(course) ? course : [course];

    const EmployeeData = new EmployeeModel({
      name,
      email,
      mobileNo,
      gender,
      designation,
      courses,
      pic,
    });

    const doc = await EmployeeData.save();
    res.status(200).send(doc);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .send("Internal Server Error, Employee could not be created!");
  }
};

const updateEmployee = async (req, res) => {
  const { name, email, mobileNo, gender, designation, course, pic, empID } =
    req.body;

  try {
    const existingEmployee = await EmployeeModel.findById(empID);
    if (!existingEmployee) {
      return res.status(404).send("Employee not found");
    }

    const isSameData =
      existingEmployee.name === name &&
      existingEmployee.email === email &&
      existingEmployee.mobileNo === mobileNo &&
      existingEmployee.gender === gender &&
      existingEmployee.designation === designation &&
      JSON.stringify(existingEmployee.courses) === JSON.stringify(course) &&
      existingEmployee.pic === pic;

    if (isSameData) {
      return res
        .status(200)
        .send("No changes detected. Employee data remains the same.");
    }

    const updatedEmployeeDoc = await EmployeeModel.findByIdAndUpdate(
      empID,
      {
        name,
        email,
        mobileNo,
        gender,
        designation,
        courses: course,
        pic,
        empID,
      },
      { new: true }
    );

    res.status(200).send(updatedEmployeeDoc);
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .send("Internal Server Error, Employee could not be updated !!!");
  }
};

const deleteEmployee = async (req, res) => {
  let employeeID = req.params.empID;

  try {
    const deletedDoc = await EmployeeModel.findByIdAndDelete(employeeID);
    res.status(200).send(deletedDoc);
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .send("Internal Server Error, Employee could not be deleted !!!");
  }
};

module.exports = {
  createEmployee,
  updateEmployee,
  getAllEmployees,
  deleteEmployee,
  doesEmployeeEmailExists,
};
