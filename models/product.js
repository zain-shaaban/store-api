const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        requireed:true
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    price:{
        type:Number,
        required:true
    },
    company:{
        type:String,
        enum:{
            values:["liddy","marcos","ikea","caressa"],
            message:"Sorry There Is No Company Like This"
        }
    }
});

module.exports=mongoose.model("Product",productSchema);