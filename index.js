import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import verifyJWT from './middleware/auth.js';
import orderRouter from './routes/orderRouter.js';

const app = express();

mongoose.connect("mongodb+srv://admin:123@cluster0.uw8dx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(
    ()=>{
        console.log("Connected to the db");
    }
).catch(
()=>{
    console.log("Connectin failed");
}
)

//mongodb+srv://admin:123@cluster0.uw8dx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//mongodb+srv://chamaraofficial2001:3ACwiTzV5e7jO3UQ@cluster0.1z7if.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

app.use(bodyParser.json());
app.use(verifyJWT);


app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);

app.listen(5000,
    ()=>{
        console.log("Server running on port 5000");
    }
)