const mongoose =require('mongoose');
const pizzaDilivaryschema =new mongoose.Schema(
    {
        firstname:{
            type:String,
            required:true
        },
        lastname:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        gender:{
            type:String,
            required:true
        },
        mobilnumber:{
            type:String,
            required:true,
            unique:true,
            minlength:10,
            maxlength:10
        },
        password:{
           type:String,
           required:true
        },
        confirmpassword:{
            type:String,
            required:true
        }

    }
)
//create collection

const Register =new mongoose.model("Registers",pizzaDilivaryschema);
module.exports=Register;

