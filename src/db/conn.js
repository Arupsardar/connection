const mongoose =require('mongoose');

mongoose.connect("mongodb://localhost:27017/pizzaDilivary",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex:true
}).then(()=>{
    console.log("connction succussful");
}).catch((err)=>{
    console.log(err);
});


