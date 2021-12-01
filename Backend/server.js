const app = require("./app");

const dotenv = require("dotenv");

const connectDatabase = require("./config/database");

//Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log("Shutting down the server due to Uncaught Exception");
    process.exit(1);
})

//Config
dotenv.config({ path: "Backend/config/config.env" });

//Connecting DataBase

connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is running working on  http://localhost/:${process.env.PORT}`
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
