const app = require("./app");
const dotenv = require('dotenv');
const path = require('path');
const ConnectDB = require("./database/database");
const configPath = path.resolve(__dirname, '../Backend_eco/config/config.env');
// process.on("unhandledRejection", (err) => {
//   console.log(`Error: ${err.message}`);
//   console.log("Shutting down the server because of unhandled Rejection");
//   process.exit(1);
// });
dotenv.config({ path: configPath });
ConnectDB();

const sever=app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

process.on("unhandleError",(err)=>{
  console.log(`Error :${err.message}`);
  console.log("shuting down the server becouse unhandle Error");
  sever.close(()=>{
    process.exit(1)
  })
})