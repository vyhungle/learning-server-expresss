const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authRouter = require("./routers/auth");
const productRouter = require("./routers/product");

const app = express();

app.use(express.json());

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
app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}/`);
});
