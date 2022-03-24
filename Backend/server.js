const app = require("./app");

require("dotenv").config();
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");

//Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log("Shutting down the server due to Uncaught Exception");
    process.exit(1);
})

//Connecting DataBase

connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  
})

const server = app.listen(process.env.PORT, () => {
  console.log(
<<<<<<< HEAD
    `Server is running on  http://localhost:${process.env.PORT}`
=======
    `Server is running working on  http://localhost:${process.env.PORT}`
>>>>>>> 7e2b957769e6e362ed21d0b1fc7bdacd7db92eb1
  );
});

//Unhandled Promise Rejections

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });
