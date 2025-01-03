const mongoose = require('mongoose');
const validator = require('validator');

const postSchema = new mongoose.Schema({
  type: {
    //!!change type to category? if in rental screen will be rental category, if used category will be used...
    type: String,
    required: [true, 'A post must have a type'],
    enum: ['rental', 'used', 'job', 'trade', 'blog', 'restaurant'],
  },
  status: {
    type: String,
    required: [true, 'A post must have a status'],
    enum: [
      'available',
      'rented',
      'for sale',
      'sold',
      'under contract',
      'open',
      'closed',
      'operational',
      'temporarily closed',
      'grand opening',
    ],
  },
  title: {
    type: String,
    required: [true, 'A post must have a title'],
    validate: {
      validator: function (val) {
        return val.length() < 0;
        // this only points to current doc on NEW document creation
        //return val < this.price
      },
      message: 'title ({VALUE}) can not be less than 0 length', //VALUE is accessing val
    },
  },
  description: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    required: [true, 'A post must have content'],
  },
  price: {
    type: Number,
    min: [0, 'Price cannot be negative'],
    required: function () {
      return (
        this.type === 'rental' || this.type === 'used' || this.type === 'trade'
      );
    },
  },
  imageCover: {
    type: String,
    validate: [
      validator.isURL,
      'Please provide a valid URL for the cover image',
    ],
  },
  images: {
    type: [String],
    validate: [validator.isURL, 'Please provide valid URLs for images'],
  },
  location: {
    //this is address where user can set at the real address or just fill some area
    type: String,
    required: [true, 'A post must have a location'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A post must be associated with a user'],
  },
  startDate: {
    type: Date,
    required: function () {
      return this.type === 'activity';
    },
  },
  endDate: {
    type: Date,
    required: function () {
      return this.type === 'activity';
    },
  },
  ratingAverage: {
    type: Number,
    min: [1, 'Rating must be between 0 and 5。0'],
    max: [5, 'Rating must be between 0 and 5。0'],
    default: 0,
    required: function () {
      return this.type === 'restaurant';
    },
  },
  ratingQuantity: {
    type: Number,
    default: 0,
    required: function () {
      return this.type === 'restaurant';
    },
  },
  cuisine: {
    type: String,
    required: function () {
      return this.type === 'restaurant';
    },
  },
  hours: {
    type: String,
    required: function () {
      return this.type === 'restaurant';
    },
  },
  menu: {
    type: [String],
    required: function () {
      return this.type === 'restaurant';
    },
  },
  grandOpeningStart: {
    type: Date,
    required: function () {
      return this.status === 'grand opening';
    },
  },
  grandOpeningEnd: {
    type: Date,
    required: function () {
      return this.status === 'grand opening';
    },
  },
  additionalInfo: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
});

postSchema.pre('save', function (next) {
  if (
    this.status === 'grand opening' &&
    this.grandOpeningEnd &&
    this.grandOpeningEnd < new Date()
  ) {
    this.status = 'operational'; // Automatically update status after grand opening period
  }
  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
