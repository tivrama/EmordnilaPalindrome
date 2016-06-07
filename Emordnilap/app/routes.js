 // app/routes.js

// grab the nerd model we just created
var Nerd = require('./models/nerd');

    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        // api route
        app.get('/api/nerds', function(req, res) {
            // use mongoose to get all nerds in the database
            Nerd.find(function(err, nerds) {

                // if there is an error retrieving, send the error. 
                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(nerds); // return all nerds in JSON format
            });
        });



        // route to handle creating (app.post)
        app.post('/api/nerds', function(req, res) {
            // use mongoose save current nerd to db
            console.log('Input Palindrome!!: ', req.body)
            console.log('INSIDE SERVER POST: HELLO!');
            // console.log(req.body);
            // console.log(req.body.text);
            new Nerd({
            name : {type : req.body}
            })
            .save(function(err, palindrome) {

                if (err) {
                    res.send('HELP!!!!!!');
                } else {
                   res.send('Success pinging post to server!'); 
                }

            });
        });


// var Schema = new mongoose.Schema({
//       _id    : String,
//       name: String,
//       age   : Number
// });

// var user = mongoose.model('emp', Schema);

//     app.post('/new', function(req, res){
//       new user({
//         _id    : req.body.email,
//         name: req.body.name,
//         age   : req.body.age        
//       }).save(function(err, doc){
//         if(err) res.json(err);
//         else    res.send('Successfully inserted!');
//       });
//     });        
        // route to handle delete (app.delete)


        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load public/index.html file
        });

    };