const mongoose = require('mongoose');
const validator = require('validator');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A category must have a name'],
    unique: true,
  },
  description: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    validate: [validator.isURL, 'Please provide a valid URL'], // Uncommented and fixed validator for the icon
  },
  type: {
    type: String,
    enum: [
      'rental',
      'used items',
      'used cars',
      'job',
      'restaurant',
      'neighbor',
      'dating',
      'activity',
      'immigration',
      'handyman',
      'lawyer',
      'tax',
      'medical', // 中西医，牙医
      'pets',
      'election',
    ], // Specifying possible category types
    required: [true, 'A category must have a type'],
  },
  tags: [
    {
      // Tags to help further describe and classify the categories
      type: String,
    },
  ],
  createdAt: {
    // Track when the category was created
    type: Date,
    default: Date.now,
    immutable: true, // Prevent changes to this field once it's set
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
