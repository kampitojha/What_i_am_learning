// Note: Yeh ek Mongoose Schema example hai.
// Isse use karne ke liye aapko "mongoose" install karna padega: 
// npm install mongoose

// import mongoose from 'mongoose';

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String, // URL or path to image
    required: true
  },
  // Optional fields jo future mein kaam aa sakte hain
  description: {
    type: String,
    required: false
  },
  inStock: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true // Automatically creates createdAt and updatedAt fields
});

// Model create karna
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product;
// export default Product; // Agar ES6 modules (import/export) use kar rahe ho backend mein
