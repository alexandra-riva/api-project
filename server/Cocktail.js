const mongoose = require('mongoose');

const cocktailSchema = new mongoose.Schema({
  name: String,
  ingredients: [String],
  instructions: String,
  alcoholic: Boolean,
  image: String,
});

const Cocktail = mongoose.model('Cocktail', cocktailSchema, 'cocktailsList');

module.exports = Cocktail;
