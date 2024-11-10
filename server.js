const Express = require("express");
const app = Express();
module.exports = { app, Express };

app.use(Express.json({ limit: "10mb" }));
app.use(Express.urlencoded({ limit: "10mb", extended: true }));

const CORS = require("cors");
app.use(
  CORS({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
connectDB();

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

//Routes
const adminRoutes = require("./routes/adminRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

app.use("/api/admin", adminRoutes);
app.use("/api/employee", employeeRoutes);

//Adding, two error handling Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Express application is running on port no. ${PORT}, in local server.`
  );
});
