// config/db.js
// process.env.MONGOLAB_URI = herokuMlab


  module.exports = {
    url: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/emordnilap'
  };



//----------------------------------------------------------------
// FOR THIRD PARTY DB HOSTING WITH MLAB //

// FOR DEPLOYMENT


// DEPLOYED version:
// var mlab = {
//   dbuser: process.env.MLAB_DBUSER,
//   dbpassword: process.env.MLAB_DBPASSWORD
// };



// module.exports = {
//   // url to mongo db, for server to connect
//   url: 'mongodb://' + mlab.dbuser + ':' + mlab.dbpassword + '@ds145415.mlab.com:45415/heroku_h31dhr65'
// };



// FOR LOCAL

// var mlab =  {
//     dbuser: require('./config.js').mlab.dbuser,
//     dbpassword: require('./config.js').mlab.dbpassword
// 	};

//   module.exports = {
//     url: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/emordnilap'
//   };