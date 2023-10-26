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
        required : true,
        unique : true
    },
    number: {
        type: "String",
        required : true,
        unique : true
    },
    password: {
        type: "String",
        required : true,
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


app.get('/login', async(req,res)=>{
    const {name, email, number, password} = req.body;
    const findUser = await userData.findOne({password, email}).select('name number email')

   if (findUser==null){
    return res.json({
        success : "false",
        message : "chal nikal yaha se..!"
    }
    )
   }
   res.json({
    success : "true",
    data : findUser,
    message : "login successfully..!"
}
)
})

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`server connect succesful on port ${PORT}`)
})
