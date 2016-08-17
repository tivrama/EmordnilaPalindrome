// app/models/palindrome.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our palindrome model
// module.exports allows to pass this to other files when it is called
module.exports = mongoose.model('Palindrome', {
    name : {type : String, default: ''}
});