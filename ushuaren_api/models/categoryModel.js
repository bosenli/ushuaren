const mongoose = require('mongoose');
const validator = require('validator');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, ' A category must have a name'],
    unique: true,
  },
  description: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    //validate: [validator.isURL, 'Please provide a valid URL'],
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
