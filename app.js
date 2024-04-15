require("dotenv").config();
require('express-async-errors');

const express = require("express");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const connectDB=require('./db/connect');
const router=require('./routes/products');

const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products Route</a>');
})

app.use('/api/v1/products',router);

app.use(notFound);
app.use(errorHandler);

const port=process.env.PORT || 3000;

const Start=async()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port,console.log(`Server Works On Port ${port}`))
    } catch (error) {
        console.log("Error :",error.message);
    }
}

Start();
