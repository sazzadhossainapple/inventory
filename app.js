const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//middlewares
app.use(express.json());
app.use(cors());

//routes
const productRoute = require("./routes/product.routes");
const brandRoute = require("./routes/brand.route");

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

//posting to database
app.use("/api/v1/product", productRoute);
app.use("/api/v1/brand", brandRoute);

// app.use("/api/v1/product");

module.exports = app;
