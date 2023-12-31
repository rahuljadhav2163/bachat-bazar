import express from "express"
import mongoose from "mongoose"
import userData from "./models/User.js";
import Products from "./models/Product.js";
import Order from "./models/Order.js";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
const app = express()

app.use(express.json());
const __dirname = path.resolve();
const mongoconnect = async () => {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    if (connection) {
        console.log("MongoDB connect Succesfullly")
    }
}
mongoconnect();


// SIGNUP USER 

app.post('/api/signup', async (req, res) => {
    const { name, email, number, password, address, gender } = req.body;
    try {
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
            success: "true",
            data: saveUser,
            message: "Signup successfully..!"
        }
        )
    } catch (e) {
        res.json({
            success: "false",
            message: e.message
        })
    }

})

// LOGIN USER


app.post('/api/login', async (req, res) => {
    const { name, email, number, password } = req.body;
    const findUser = await userData.findOne({ password, email }).select('name number email')

    if (findUser == null) {
        return res.json({
            success: "false",
            message: "chal nikal yaha se..!"
        }
        )
    }
    res.json({
        success: "true",
        data: findUser,
        message: "login successfully..!"
    }
    )
})

// POST ALL THE PRODUCT 

app.post('/api/postproduct', async (req, res) => {
    const { name, description, image, price, brand, category } = req.body;

    const newProduct = new Products({
        name, description, image, price, brand, category
    })

    try {
        const savedProduct = await newProduct.save();
        res.json({
            success: "true",
            data: savedProduct,
            message: "Product added successfully..!"
        })
    }
    catch (e) {
        res.json({
            success: "false",
            message: e.message
        })
    }

})

// GET ALL PRODUCT 

app.get('/api/getproducts', async (req, res) => {
    const allProduct = await Products.find();

    res.json({
        success: "true",
        data: allProduct,
        message: "Products display succesfully..!"
    })
})


// GET PRODUCT BY ID

app.get('/api/getproduct/:id', async (req, res) => {
    const { id } = req.params

    const idProduct = await Products.findOne({ _id: id })
    res.json({
        success: "true",
        data: idProduct,
        message: "Product display succesfully..!"
    })
})

// DELETE PRODUCT BY ID

app.delete('/api/delproduct/:id', async (req, res) => {
    const { id } = req.params

    await Products.deleteOne({ _id: id })

    res.json({
        success: "true",
        message: "Product delete succesfully..!"
    })
})

// UPDATE PRODUCT

app.put('/api/updateproduct/:id', async (req, res) => {
    const { id } = req.params

    const { name, description, image, price, brand, category } = req.body;

    await Products.updateOne({ _id: id },
        {
            $set: {
                name, description, image, price, brand, category
            }
        })

    const updatedProduct = await Products.findOne({ _id: id })


    res.json({
        success: "true",
        data: updatedProduct,
        message: "Product update succesfully..!"
    })
})


// SEARCH PRODUCT

app.get('/api/searchproduct', async (req, res) => {
    const { q } = req.query;

    const searchProduct = await Products.find({ name: { $regex: q, $options: 'i' } })

    res.json({
        success: "true",
        data: searchProduct,
        message: "Product find succesfully..!"
    })

})


// PLACE ORDER

app.post('/api/order', async (req, res) => {
    const { user, product, status, quantity, deliveryCharges, shipingAddress } = req.body;

    const oreders = new Order({
        user, product, status, quantity, deliveryCharges, shipingAddress
    })

    try {
        const saveOrder = await oreders.save();
        res.json({
            success: true,
            Order: saveOrder,
            message: " Place your order..!"
        })
    } catch (e) {
        res.json({
            success: false,
            message: e.message
        })
    }

})

// GET ORDER BY ID

app.get('/api/getorder/:id', async (req, res) => {
    const { id } = req.params;

    const viewOrder = await Order.findOne({ _id: id }).populate("user product");

    viewOrder.user.password = undefined

    res.json({
        success: "true",
        data: viewOrder,
        message: "Order fetched succesfully..!"
    })

})

// GET ALL ORDERS OF USER

app.get('/api/getorder/user/:id', async (req, res) => {
    const { id } = req.params
    const findOrders = await Order.find({ user: { _id: id } }).populate('user  product')
    findOrders.forEach((Order)=>{
       
    })
    res.json({
        success:"true",
        data:findOrders,
        message:" Orders fetch successfully..!"  
      })
})

// GET ALL OREDERS

app.get('/api/oreders' , async(req,res)=>{
    const allOrders = await Order.find();
    res.json({
        success:"true",
        data:allOrders,
        message:" Orders fetch successfully..!"  
      })
})

// UPDATE STATUS

app.patch('/api/status/:id',async(req,res)=>{
    const {status} = req.body;
    const {id} = req.params;
    
    await Order.updateOne({_id:id},{$set:{status:status}})

     const updatedStatus = await Order.findOne({_id:id})

     res.json({
        success:"true",
        data:updatedStatus,
        message:" Status updated successfully..!" 
     })
})

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
    })
}

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`server connect succesful on port ${PORT}`)
})
