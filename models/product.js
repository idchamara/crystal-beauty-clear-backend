import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productId : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    altName : {
        type : [String],
        default : []
    },
    price : {
        type : Number,
        required : true
    },
    labeledPrice : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    image : {
        type : [String],
        required : true,
        default : ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTikef76pBA_Wy2TeDOXhXFQSojlXcYxo3WbQ&s"]
    },
    stock : {
        type : Number,
        required : true
    },
})

const Product = mongoose.model("product",productSchema)
export default Product;