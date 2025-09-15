const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Student = require("./models/database");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/crudApp");

// READ - Home page with list
app.get("/", async (req, res) => {
  const students = await Student.find();
  res.render("index", { students });
});

// CREATE - Add Student
app.post("/add", async (req, res) => {
  const { name, age, course } = req.body;
  const student = new Student({ name, age, course });
  await student.save();
  res.redirect("/");
});

// UPDATE - Load Edit Form
app.get("/edit/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.render("edit", { student });
});

// UPDATE - Handle Edit Form Submission
app.post("/update/:id", async (req, res) => {
  const { name, age, course } = req.body;
  await Student.findByIdAndUpdate(req.params.id, { name, age, course });
  res.redirect("/");
});

// DELETE - Remove Student
app.get("/delete/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
