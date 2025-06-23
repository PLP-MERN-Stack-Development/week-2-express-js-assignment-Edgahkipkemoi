// data/products.js
const { v4: uuidv4 } = require('uuid');

module.exports = [
  {
    id: uuidv4(),
    name: "Laptop",
    description: "High performance laptop",
    price: 1200,
    category: "Electronics",
    inStock: true
  },
  {
    id: uuidv4(),
    name: "Chair",
    description: "Ergonomic office chair",
    price: 150,
    category: "Furniture",
    inStock: false
  }
];
