const Mongoose = require("mongoose");

const EmployeeSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    mobileNo: {
      type: String,
      required: true,
      unique: true,
    },

    gender: {
      type: String,
      required: true,
    },

    designation: {
      type: String,
      required: true,
    },

    courses: {
      type: [String],
      default: [],
    },

    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const EmployeeModel = Mongoose.model("employees", EmployeeSchema);

module.exports = EmployeeModel;
