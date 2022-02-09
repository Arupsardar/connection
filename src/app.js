require('dotenv')
const express = require("express");
const { json } = require("express");
const path = require("path");
const hbs = require("hbs");
const register = require("./models/register");
const bcrypt = require("bcryptjs");
const jwt =require('jsonwebtoken')


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

      //middelwear
      // console.log("the success part" +registeruser);
      const token =await registeruser.genarateAuthToken();
      // console.log("the token part "+ token);


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
    const isMatch =await bcrypt.compare(pw,useremail.password)
    if (isMatch) {
      res.status(201).render("index");
    } else {
      res.send("Passwords are not matching");
    }
  } catch (err) {
    res.status(400).send("invalid page");
  }
});

// const createToken = async () => {
//   const token = await jwt.sign(
//     { _id: "61fbb62eda09cbabff474c12" },
//     "myNameIsArupAndIamNotATerorist",{expiresIn:"2 seconds"}
//   );
//   console.log(token);
//   const userVer = await jwt.verify(token,"myNameIsArupAndIamNotATerorist");
//   console.log(userVer);

// }

// createToken();




app.listen(port, () => {
  console.log("server is runing at port no  " + port);
});
