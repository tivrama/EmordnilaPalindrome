// app/models/palindrome.js

var mongoose = require('mongoose');

module.exports = mongoose.model('Palindrome', {
  name : {type : String, default: ''},
  lintedName : {type : String, default: ''}
});
