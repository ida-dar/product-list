const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
  name: { type: String, maxLength: 100, required: true },
  price: { type: String, required: true },
  updateDate: { type: Date },
});

module.exports = mongoose.model('Product', productsSchema);
