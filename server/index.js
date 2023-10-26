import express from "express"
import mongoose, { Schema, model } from "mongoose"
import dotenv from "dotenv";
dotenv.config();
const app = express()

app.use(express.json());

const mongoconnect = async () => {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    if (connection) {
        console.log("MongoDB connect Succesfullly")
    }
}
mongoconnect();


const User = new Schema({
    name: {
        type : "String",
        default: "-"
    },
    email: {
        type: "String",
        require : true,
        unique : true
    },
    number: {
        type: "String",
        require : true,
        unique : true
    },
    password: {
        type: "String",
        require : true,
    },
    address: {
        type : "String",
        default : "-"
    },
    gender: {
      type : "string",
      default : "Prefer not to say"
    }
})

const userData = model('userData', User);

app.post('/signup' , async(req,res)=>{
    const {name,email,number,password,address,gender} = req.body;
    try{
    const newUser = new userData({
        name,
        number,
        email,
        address,
        password,
        gender
    })

    const saveUser = await newUser.save();

        res.json({
            success : "true",
            data : saveUser,
            message : "Signup successfully..!"
        }
        )
    }catch(e){ res.json({
        success : "false",
        message : e.message
    }) }      
    
})


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`server connect succesful on port ${PORT}`)
})
