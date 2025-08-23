const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const app = express();

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const users = require("./routes/userRoute");
app.use("/api/v1/auth", users);

module.exports = app;
