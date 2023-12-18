import { Schema , model } from "mongoose"

const Userschema = new Schema({
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

const User = model('userData', Userschema);
export default User;
