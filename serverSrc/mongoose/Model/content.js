const mongoose = require('mongoose');
const ContentSchema = require('../Schema/content');
module.exports = mongoose.model('Content',ContentSchema);