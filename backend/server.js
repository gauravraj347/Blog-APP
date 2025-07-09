const express = require('express');
const bodyParser = require('body-parser');
const createHandler = require('./api/create');
const slugHandler = require('./api/[slug]');
const listHandler = require('./api/list');

const app = express();
app.use(bodyParser.json());

const cors = require('cors');

// Configure CORS to allow your frontend domain
app.use(cors({
  origin: [
    'https://blog-app-ten-mu-10.vercel.app',
    'http://localhost:3000', // For local development
    'http://localhost:3001'   // For local development
  ],
  credentials: true
}));

require('dotenv').config();

// Create post
app.post('/api/posts/create', (req, res) => createHandler(req, res));
// List posts
app.get('/api/posts', (req, res) => listHandler(req, res));
// Get, update, delete post by slug
app.get('/api/posts/:slug', (req, res) => {
  req.query = { slug: req.params.slug };
  slugHandler(req, res);
});
app.put('/api/posts/:slug', (req, res) => {
  req.query = { slug: req.params.slug };
  slugHandler(req, res);
});
app.delete('/api/posts/:slug', (req, res) => {
  req.query = { slug: req.params.slug };
  slugHandler(req, res);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 