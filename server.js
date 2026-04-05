const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/kmp_blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const postRoutes = require("./models/routes/posts");
app.use("/api/posts", postRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));