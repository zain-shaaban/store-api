const connectDB=require("./db/connect");
require("dotenv").config();
const Product=require("./models/product");
const allProducts=require("./products.json");
const start=async()=>{
    try {
        db=await connectDB(process.env.MONGO_URI);
    } catch (error) {
        console.log(error.message)
    }
}
const CreateNew=async()=>{
    await Product.deleteMany();
    await Product.create(allProducts);
    process.exit(0);
}
start();
CreateNew();
