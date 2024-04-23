const express = require("express");
const app = express();
const cookieParser=require("cookie-parser")

app.use(express.json());
app.use(cookieParser())
// route import
const product = require("./Route/ProductRoute");
const midddleware = require("./middleware/middleware")
const userdata = require("./Route/userroutes")
app.use("/api/v1", product);
app.use("/api/v1", userdata)
app.use(midddleware);

module.exports = app;