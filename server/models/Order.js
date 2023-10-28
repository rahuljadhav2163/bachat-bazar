import { Schema,model } from "mongoose";

const orderSchema = new Schema (
    {
        user:{
            type : Schema.Types.ObjectId,
            ref : "userData",
            required : true
        },
        product:{
            type : Schema.Types.ObjectId,
            ref : "Products",
            required : true
        },
        quantity:{
            type : Number,
            default : "1",
        },
        status:{
            type: String,
            default: "pending"
        },
        shipingAddress:{
            type : String,
            required : true
        },
        deliveryCharges:{
            type : Number,
            default : 0
        }
    },{
        timestamps :  true
    }
)

const Order = model("order" , orderSchema )
export default Order