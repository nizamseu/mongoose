const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const colors = require("colors");

const app = require("./index.js");
// database connected
mongoose.connect(`${process.env.DATABASE_LOCAL}`).then(() => {
  console.log(`database Connected`.green.bold);
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Successfully Connected ${port}`.red.bold);
});
