class APIFeatures {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    } //mongoose query, and query from req express from route
  
    filter() {
      const queryObj = { ...this.queryString }; //filter function
      const excludedFields = ['page', 'sort', 'limit', 'fields'];
      excludedFields.forEach(el => delete queryObj[el]);
  
      // 2) Advance filtering
      let queryStr = JSON.stringify(queryObj);
      //console.log('query str ', queryStr);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
      //gte, gt, lte, lt
      this.query = this.query.find(JSON.parse(queryStr));
      return this; //return the entire object
    }
  
    sort() {
      if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(',').join(' '); //sort by two or more params condition, in mongo sort(price rating)
        this.query = this.query.sort(sortBy);
      } else {
        this.query = this.query.sort('-createdAt'); // Correcting the field name here
      }
      return this;
    }
  
    limitFields() {
      if (this.queryString.fields) {
        const fields = this.queryString.fields.split(',').join(' ');
        this.query = this.query.select(fields);
      } else {
        this.query = this.query.select('-__v');
      }
      return this;
    }
  
    paginate() {
      const page = this.queryString.page * 1 || 1; //default to page 1
      const limit = this.queryString.limit * 1 || 100;
      const skip = (page - 1) * limit;
  
      this.query = this.query.skip(skip).limit(limit);
  
      return this;
    }
  }

  module.exports = APIFeatures;