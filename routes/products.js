// routes/products.js
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { NotFoundError, ValidationError } = require('../utils/errors');

let products = require('../data/products');
const router = express.Router();

// Validation Middleware
const validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  if (!name || !description || price === undefined || !category || inStock === undefined) {
    throw new ValidationError("All product fields are required");
  }
  next();
};

// GET all with filtering, pagination, and search
router.get('/', (req, res) => {
  let result = [...products];

  if (req.query.category) {
    result = result.filter(p => p.category === req.query.category);
  }

  if (req.query.search) {
    result = result.filter(p =>
      p.name.toLowerCase().includes(req.query.search.toLowerCase())
    );
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || result.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  res.json(result.slice(start, end));
});

// GET by ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) throw new NotFoundError("Product not found");
  res.json(product);
});

// POST new
router.post('/', validateProduct, (req, res) => {
  const newProduct = { id: uuidv4(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update
router.put('/:id', validateProduct, (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) throw new NotFoundError("Product not found");
  products[index] = { id: req.params.id, ...req.body };
  res.json(products[index]);
});

// DELETE
router.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) throw new NotFoundError("Product not found");
  products.splice(index, 1);
  res.json({ message: "Product deleted" });
});

// Product statistics
router.get('/stats/category', (req, res) => {
  const stats = {};
  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  res.json(stats);
});

module.exports = router;
