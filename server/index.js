const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const bodyParser = require("body-parser");
const db = require("./db");
const { userRouter } = require("./routes/UserRouter");
const { authRouter } = require("./routes/AuthRouter");
const { productRouter } = require("./routes/ProductRouter");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
