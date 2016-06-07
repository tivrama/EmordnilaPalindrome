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
            // console.log('INSIDE GET!!!')

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
            // console.log('INPUT INSIDE SERVER POST!!: ', req.body)
            var userEntry = new Nerd({

            name: req.body.entry

            });
            userEntry.save(function(err, resp) {
                if (err) {
                    res.send(err);
                    console.log(err);
                    // console.log('Fail saving to server');
                } else {
                   res.send({message:'the palindrome has been saved'}); 
                    // console.log('Success saving to server');
                }

            });
        });


       
        // route to handle delete (app.delete)


        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load public/index.html file
        });

    };