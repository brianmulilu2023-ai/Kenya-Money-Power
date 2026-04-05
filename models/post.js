const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: String,
  category: {
    type: String,
    required: true,
    enum: ['Money & Power', 'Market Watch', 'The Numbers Game', 'Insights']
  },
  tags: [String],
  image: String,
  featured: {
    type: Boolean,
    default: false
  },
  author: {
    type: String,
    default: 'Kenya Money & Power'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Post", PostSchema);