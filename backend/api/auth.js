module.exports = function (req, res, next) {
  const apiKey = process.env.ADMIN_API_KEY;
  const providedKey = req.headers['x-api-key'];
  if (!apiKey || providedKey !== apiKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}; 