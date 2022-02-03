const express = require("express");
const { json } = require("express");
const path = require("path");
const hbs = require("hbs");
const register = require("./models/register");

const app = express();
require("./db/conn");
const port = process.env.PORT || 8000;

const staticpath = path.join(__dirname, "../public");
const tamplatespath = path.join(__dirname, "../templates/views");
const partialspath = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(staticpath));

app.set("view engine", "hbs");
app.set("views", tamplatespath);
hbs.registerPartials(partialspath);

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/register", (req, res) => {
  res.render("register");
});
//
app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;
    if (password === cpassword) {
      const registeruser = new register({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        gender: req.body.gender,
        mobilnumber: req.body.mobilnumber,
        password: password,
        confirmpassword: cpassword,
      });
      const reg = await registeruser.save();
      res.status(201).render("index");
    } else {
      res.send("password are not match");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});
app.get("/login", (req, res) => {
  res.render("login");
});
//log in chack
app.post("/login", async (req, res) => {
  try {
    const email = req.body.username;
    const pw = req.body.userpassword;
    //  console.log(`email ${email} password ${pw}`);
    const useremail = await register.findOne({ email: email });
    if (useremail.password === pw) {
      res.status(201).render("index");
    } else {
      res.send("Passwords are not matching");
    }
  } catch (err) {
    res.status(400).send("invalid page");
  }
});

app.listen(port, () => {
  console.log("server is runing at port no  " + port);
});
