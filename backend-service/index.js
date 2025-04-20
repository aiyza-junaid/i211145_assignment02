
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Mongo connection error:", err));

const User = mongoose.model("User", new mongoose.Schema({
  email: String,
  password: String,
}));

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({}, { email: 1, _id: 0 });
    res.json(users);
  } catch (err) {
    res.status(500).send("Error fetching users");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend service listening on ${PORT}`));
