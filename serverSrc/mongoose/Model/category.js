const mongoose = require('mongoose');
const categorySchema = require('../Schema/category');
module.exports = mongoose.model('Category', categorySchema);