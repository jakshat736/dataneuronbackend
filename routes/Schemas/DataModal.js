const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  
    name: {
    type: String,
    required: true
  },
    age: {
    type: String,
    required: true,
  },  
});

const dataSchema = mongoose.model('table', DataSchema);

module.exports = dataSchema;
