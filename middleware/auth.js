module.exports = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== '123456') {
    return res.status(401).json({ error: "Unauthorized - Invalid API Key" });
  }
  next();
};
