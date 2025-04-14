const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: __dirname + '/.env' });

console.log("MONGO_URI is:", process.env.MONGO_URI);

const app = express();
const PORT = 5050;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Mongoose model
const Cocktail = require('./Cocktail');

// GET all cocktails or filter by name or ingredient
app.get('/api/cocktails', async (req, res) => {
  const { ingredient, name } = req.query;

  try {
    let query = {};

    if (name) {
      query.name = { $regex: new RegExp(name, "i") }; // case-insensitive name match
    }

    if (ingredient) {
      query.ingredients = { $elemMatch: { $regex: new RegExp(ingredient, "i") } };
    }

    const cocktails = await Cocktail.find(query);
    res.status(200).json(cocktails);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cocktails', error });
  }
});

// POST a new cocktail
app.post('/api/cocktails', async (req, res) => {
  try {
    const { name, ingredients, instructions, alcoholic, image } = req.body;

    if (!name || !ingredients || !instructions || !image) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newCocktail = new Cocktail({ name, ingredients, instructions, alcoholic, image });
    await newCocktail.save();

    res.status(201).json({ message: 'Cocktail created', cocktail: newCocktail });
  } catch (error) {
    res.status(500).json({ message: 'Error creating cocktail', error });
  }
});

// DELETE a cocktail by ID
app.delete('/api/cocktails/:id', async (req, res) => {
  try {
    const deleted = await Cocktail.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Cocktail not found' });
    }

    res.status(200).json({ message: 'Cocktail deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting cocktail', error });
  }
});

// GET a random cocktail
app.get('/api/cocktails/random', async (req, res) => {
  try {
    const count = await Cocktail.countDocuments();
    const random = Math.floor(Math.random() * count);
    const cocktail = await Cocktail.findOne().skip(random);

    if (!cocktail) {
      return res.status(404).json({ message: 'No cocktails found' });
    }

    res.status(200).json(cocktail);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching random cocktail', error });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
