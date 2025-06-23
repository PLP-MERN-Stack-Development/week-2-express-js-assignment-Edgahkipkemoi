// server.js
const express = require('express');
const productRoutes = require('./routes/products');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Parse incoming JSON
app.use(express.json());

// Optional: If you're using body-parser separately (not needed if you use express.json())
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());

app.use(logger);  // Custom logging middleware
app.use(auth);    // API key check middleware

// Routes
app.use('/api/products', productRoutes);

// Hello World route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Global error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
