const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const productRoute = require("./routes/productsRoute");
const reviewroute = require("./routes/reviewRoute");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const ordersRoute = require("./routes/ordersRoute");
const formRoute = require("./routes/formRoute");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use("/auth", authRoute);
app.use("/products", productRoute);
app.use("/reviews", reviewroute);
app.use("/users", userRoute);
app.use("/orders", ordersRoute);
app.use("/forms", formRoute);

dotenv.config({ path: ".env" });
mongoose
  .connect(process.env.MONGO_URI)
  .then(console.log("connected to mongo")) // print "connected " if there is not error
  .catch((err) => console.log(err)); // print error if an error occurred

const port = process.env.PORT;
const url = process.env.SERVER_URL;

app.listen(port, url, () => {
  console.log(`listening on ${url}:${port}`);
});
