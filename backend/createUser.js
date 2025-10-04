import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: Boolean
});

const User = mongoose.model("User", userSchema);

// User data
const createAdminUser = async () => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync("123456", salt); // replace 123456 with your password

  const user = new User({
    name: "Admin",
    email: "admin@example.com",
    password: hashedPassword,
    isAdmin: true
  });

  await user.save();
  console.log("Admin user created!");
  mongoose.disconnect();
};

createAdminUser();
