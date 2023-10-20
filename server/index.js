const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://dharhacks:KfYYaWCNDC7ZCqaF@cluster0.kwhiyso.mongodb.net/LingoDB");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error in connecting database"));
db.once("open", () => console.log("Connected to database"));
app.use(express.json());
app.use(cors());
app.use("/api/users", require("./routes/user"));
app.use("/api/exams", require("./routes/exam"));
app.use("/api/reports", require("./routes/reports"));
const port = 3001;
app.listen(port, () => {
  console.log("Server listening on port", port);
});
