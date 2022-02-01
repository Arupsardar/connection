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

const register =new mongoose.model("registers",pizzaDilivaryschema);
module.exports=register;

