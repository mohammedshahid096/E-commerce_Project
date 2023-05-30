import express from "express";
import dotenv from "dotenv";
import Product from "./Routes/productRoute.js";
import DataBaseCon from "./Config/DatabaseCon.js";
import user_route from "./Routes/userRoute.js";
import cookieParser from "cookie-parser";
import orderrouter from "./Routes/orderRoute.js";
import cors from "cors";
import cloudinary from "cloudinary";

//express to start using express module through app
const app = express();

//to accept body in the form of json
app.use(express.json());

app.use(cookieParser());

//initialise dotenv file
dotenv.config({ path: "./Config/config.env" });

//MongodB configuration
DataBaseCon();

// cloudinary conncection
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRETKEY,
});

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/ecommerceAPI/", Product);
app.use("/ecommerceAPI/users", user_route);
app.use("/ecommerceAPI/order", orderrouter);

//app will start on the given port
app.listen(process.env.PORT, () => {
  console.log(`serverr running..... port at ${process.env.PORT} `);
});
