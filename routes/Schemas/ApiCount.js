const mongoose = require('mongoose');

const CountSchema = new mongoose.Schema({
  
    addCount: { type: Number, default: 0 },
    updateCount: { type: Number, default: 0 },
});

const countSchema = mongoose.model('apiCount', CountSchema);

module.exports = countSchema;
