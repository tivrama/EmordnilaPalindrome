// config/db.js
  // module.exports = {
  //   url: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/emordnilap'
  // };

  module.exports = {
    url: process.env.MONGOLAB_URI
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
//   // url to mongo db named foodiepal, for server to connect to
//   url: 'mongodb://' + mlab.dbuser + ':' + mlab.dbpassword + '@ds0145295.mlab.com:145295/palindrome'
// };



// FOR LOCAL

// var mlab =  {
//     dbuser: require('./config.js').mlab.dbuser,
//     dbpassword: require('./config.js').mlab.dbpassword
// 	};

//   module.exports = {
//     url: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/emordnilap'
//   };