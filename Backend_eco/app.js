const express = require("express");
const app = express();


app.use(express.json());
// route import
const product = require("./Route/ProductRoute");
const midddleware=require("./middleware/middleware")
app.use("/api/v1",product);

app.use(midddleware);

module.exports = app;