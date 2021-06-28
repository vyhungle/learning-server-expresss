const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const authRouter = require("./routers/auth");
const productRouter = require("./routers/product");
const categoryRouter = require("./routers/category");
const cartRouter = require("./routers/cart");

const app = express();

app.use(express.json());
app.use(cors());

//connect mongoose
mongoose
  .connect(process.env.DB_CONNECT_STRING, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

//
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/cart", cartRouter);
app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}/`);
});
