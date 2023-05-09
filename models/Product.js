const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

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
      lowercase: true,
    },

    description: {
      type: String,
      required: true,
    },

    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs", "bag"],
        message: "unit value can't be {VALUE}, must be kg/litre/pcs/bag",
      },
    },

    // price: {
    //   type: Number,
    //   required: true,
    //   min: [0, "Price can't be negative"],
    // },
    // quantity: {
    //   type: Number,
    //   required: true,
    //   min: [0, "quantity can't be negative"],
    //   validate: {
    //     validator: (value) => {
    //       const isInteger = Number.isInteger(value);
    //       if (isInteger) {
    //         return true;
    //       } else {
    //         return true;
    //       }
    //     },
    //   },
    //   message: "Quantity must be an integer",
    // },
    // status: {
    //   type: String,
    //   enum: {
    //     values: ["in-stock", "out-of-stock", "discontinued"],
    //     message: "statusw can't be {VALUE}",
    //   },
    // },

    imageURLs: [
      {
        type: String,
        required: true,
        validate: {
          validator: (value) => {
            if (!Array.isArray(value)) {
              return false;
            }
            let isValid = true;
            value.forEach((url) => {
              if (!validator.isURL(url)) {
                isValid = false;
              }
            });
            return isValid;
          },
          message: "please provide valid image urls",
        },
      },
    ],
    category: {
      type: String,
      required: true,
    },

    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
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

module.exports = Product;
