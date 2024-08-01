const mongoose = require("mongoose");

const connectToMongo = async () => {
  try {
      await mongoose.connect("mongodb+srv://dhruv:<password>@cluster0.l51ferf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/Users", { useNewUrlParser: true });
      console.log("connected to MongoDB")
  }
  catch(error){
      console.log("error connection to MongoDB:", error.message)
  }
};


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to User model
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model("Account", accountSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
  User,
  Account,
};
