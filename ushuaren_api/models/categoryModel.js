const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');

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
  category: {
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
      'business sale',
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
    select: false, //hide create at in response
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A post must be associated with a user'],
  },
});
//------------------------------------------------------------------------------------
//add to schema for virtual property , and code below
//{toJson:{ virtuals: true},toObject:{virtuals:true}}

//Virtual property example: will not persist in the database, only here as soon as we get the data
//categorySchema.virtual('durationWeeks').get(function () {
//   //real function here to be able to use "this" key word
//   return this.duration / 7; //this keyword point to current document
// });
//---------------------------------------------------------------------------------------
//MONGOOSE HAS 4 MIDDLEWARE THAT ACT AS PRE-HOOK OR AFTER-HOOK: DOCUMENT , QUERY, AGGREGATE, AND MODEL MIDDLEWARE
// 1) DOCUMENT MIDDLEWARE: ACT ON PROCESSED MIDDLEWARE, DEFINE MIDDLEWARE ON THE SCHEMA
//runs before document saved to database that is .save() and .create()
categorySchema.pre('save', function (next) {
  //   console.log(this); //run the processed document
  //“THIS” POINTS TO CURRENT DOCUMENT AS IT IS DOCUMENT MIDDLEWARE
  this.slug = slugify(this.name, { lower: true }); //lower case. and pre in mongoose can access next, !!!!also need to add slug at model part!!!
  next(); //next middleware
});

categorySchema.post('save', function (doc, next) {
  console.log(doc);
  next();
});
//QUERY MIDDLEWARE: middleware that is gonna run before find query is executed !!add to model
categorySchema.pre(/^find/, function (next) {
  //processing all strings start with find: find, findOne
  // categorySchema.pre('find', function(next)){//processing
  //"THIS " BELOW POINTS TO CURRENT QUERY
  this.find({ secretTour: { $ne: true } }); //this here is query object, not document object anymore , so only chain method for query.and $ne is not equal
  this.start = Date.now();
  next();
});
categorySchema.post(/^find/, function (doc, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  // console.log(docs);
  next();
});

//Mongoose AGGREGATION MIDDLEWARE
categorySchema.pre('aggregate', function (next) {
  this.pipeline().unshift({
    //another stage
    $match: {
      secretTour: {
        $ne: true,
      },
    },
  }); //unshift to insert start of the array

  //“THIS” POINTS TO AGGREGATION OBJECT
  console.log(this);
  next();
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
