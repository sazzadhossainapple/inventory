const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//middlewares
app.use(express.json());
app.use(cors());

//schema design
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide a name for this product"],
      trim: true,
      unique: [true, "Name is must be unique"],
      minLength: [3, "Name must be at least 3 characters."],
      maxLenght: [100, "Name is to Large."],
    },

    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs"],
        message: "unit value can't be {VALUE}, must be kg/litre/pcs",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "quantity can't be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return true;
          }
        },
      },
      message: "Quantity must be an integer",
    },
    status: {
      type: String,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "statusw can't be {VALUE}",
      },
    },

    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Supplier",
    // },
    // categories: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId,
    //   },
    // ],

    // createdAt:{
    //   type:Date,
    //   default:Date.now,
    // },
    // updatedAt:{
    //   type:Date,
    //   default:Date.now,
    // }
  },
  {
    timestamps: true,
  }
);

//SCHEMA -> MODEL -> QUERY
const Product = mongoose.model("Product", productSchema);

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

//posting to database

app.post("/api/v1/product", async (req, res, next) => {
  try {
    //save or create
    // const product = new Product(req.body);

    // if (product.quantity === 0) {
    //   product.status = "out-of-stock";
    // }
    // const result = await product.save();

    const result = await Product.create(req.body);

    res.status(200).json({
      status: "success",
      message: "Data inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "data is not inserted",
      error: error.message,
    });
  }
});

module.exports = app;
