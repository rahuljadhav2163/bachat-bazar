import { Schema, model } from "mongoose";

const Product = new Schema(
   {
     name : {
        type : String,
        required : true
    },
    description:{
        type:String,
    },
    price:{
        type : Number,
        required : true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type : String,
    },
    brand:{
        type:String,
    }
},{
    timestamps: true
}
);

const Products = model('Products' ,Product )

export default Products