const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");

app.use(express.json());
app.use(cors());

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, " Filed Cannot be empty"],
    trim: true,
    maxLength: [100, " Name Too Long"],
    minLength: [3, " Name Too Short"],
    unique: [true, "Name Must be Unique"],
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    minLength: [0, "Value Cannot be Negative"],
  },
  units: {
    type: String,
    required: true,
    emun: {
      values: ["kg,", "litre", "pcs"],
      message: "unit Value cannot be {VALUE}, Must be , KG,Litre,Psc",
    },
  },
  quantity: {
    type: Number,
    required: true,
    minLength: [0, "quantity Cannot be Negative"],
    validate: {
      validator: (value) => {
        const isInteger = Number.isInteger(value);
        if (isInteger) {
          return true;
        } else return false;
      },
      message: "Quantity Must be Integer",
    },
  },
  status: {
    type: String,
    required: true,
    emun: {
      values: ["In-Stock", "Out-of-Stock"],
      message: "statu Value cannot be {VALUE}",
    },
  },
});
const Product = mongoose.model("Product", productSchema);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/v1/product", async (req, res) => {
  try {
    // const product = new Product(req.body);
    // if (product.quantity === 0) {
    //   product.status = "Out-of-Stock";
    // }
    const result = await Product.create(req.body);
    res.status(200).json({
      status: "Success",
      message: "Data Inserted Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Datais not  Inserted ",
      data: error.message,
    });
  }
});

module.exports = app;
