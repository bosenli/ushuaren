const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: [true, 'Street name is required'],
  },
  city: {
    type: String,
    required: [true, 'City name is required'],
  },
  state: {
    type: String,
    required: [true, 'State name is required'],
  },
  postalCode: {
    type: String,
    required: [true, 'Postal code is required'],
  },
  country: {
    type: String,
    required: [true, 'Country name is required'],
  },
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number], // Array of numbers for longitude (index 0), latitude (index 1)
      required: true,
    },
  },
});

// Create a geospatial index on the 'location' path
addressSchema.index({ location: '2dsphere' });

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
