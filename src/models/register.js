require('dotenv')
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pizzaDilivaryschema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  mobilnumber: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 10,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
  tokens:[{
    token:{
      type :String,
      required:true
    }

  }],
});
//generating token
pizzaDilivaryschema.methods.genarateAuthToken = async function () {
  try {
    console.log(this._id);
    const token = jwt.sign({ _id: this._id.toString() },process.env.SECRET_KEY);
    // console.log(token);
    this.tokens= this.tokens.concat({token:token});
    await this.save();
    return token;
  } catch (error) {
    res.send("This error part" + error);
    console.log("This error part" + error);
    
  }
};
//convart password into hash
pizzaDilivaryschema.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log(`${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    console.log(`${this.password}`);
    this.confirmpassword = undefined;
  }
  next();
});
//create collection

const Register = new mongoose.model("Registers", pizzaDilivaryschema);
module.exports = Register;
