const app = require("./app");
const dotenv = require('dotenv');
const path = require('path');
const ConnectDB = require("./database/database");
const configPath = path.resolve(__dirname, '../Backend_eco/config/config.env');
dotenv.config({ path: configPath });
ConnectDB();



app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
