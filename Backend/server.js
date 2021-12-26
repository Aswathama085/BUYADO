const app = require("./app");

require("dotenv").config();;

const connectDatabase = require("./config/database");

//Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log("Shutting down the server due to Uncaught Exception");
    process.exit(1);
})

//Connecting DataBase

connectDatabase();
const PORT=process.env.PORT||8000;
const server = app.listen(PORT, () => {
  console.log(
    `Server is running working on  http://localhost:${PORT}`
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
