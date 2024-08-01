const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const mainRouter = require("./routes/index");
const cors = require("cors");

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/api/v1", mainRouter);

// /api/v1/user/signup
// /api/v1/user/signin
// /api/v1/user/changePassword.....

// /api/v1/account/transferMoney
// /api/v1/account/balance

const connectToMongo = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
      });
      console.log("Connected to MongoDB");
    } catch (error) {
      console.log("Error connecting to MongoDB:", error.message);
    }
  };

app.get("/", (req, res) => {
  res.json("Server is up and running");
});

app.listen(process.env.PORT, () => {
    connectToMongo();
  console.log("Server is running on port: " + process.env.PORT);
});
