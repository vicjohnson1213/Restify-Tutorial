// server.js

// Load the dependecies that we will be using.
var restify = require('restify'),
    mongoose = require('mongoose');

// Connects to the "restify_tutorial" database running on a local instance of MongoDB.
mongoose.connect('mongodb://localhost/restify_tutorial');

// Creates a new model that can be used to interact with the database.
var Friend = mongoose.model('Friend', {
    firstName: String,
    lastName: String,
    birthDate: Date
});

// Create a new server that will hold the routes for the API.
var server = restify.createServer();

// Before each request, we want to clean up the paths.
server.pre(restify.pre.sanitizePath());

// Parse the body of each request to it is available at req.params.
server.use(restify.bodyParser());

// Creates a new Friend in the database and responds with an array of all Friends.
server.post('/friends', function(req, res, next) {
    Friend.create({
        firstName: req.params.firstName,
        lastName: req.params.lastName,
        birthDate: new Date(req.params.birthDate)
    }, function(err, friend) {
        if (err)
            res.send(500);

        // Get all Friends and send them to the caller.
        Friend.find(function(err, friends) {
            if (err)
                res.send(500);

            res.json(friends);
        });
    });

    return next();
});

// Gets all Friends in the database.
server.get('/friends', function(req, res, next) {
    Friend.find(function(err, friends) {
        if (err)
            res.send(500);

        res.json(friends);
    });

    return next();
});

// Gets a Friend by their database id.
server.get('/friends/:id', function(req, res, next) {
    Friend.findById(req.params.id, function(err, friend) {
        if (!friend)
            res.send(404);

        // We only need to return the first friend that was found.
        res.json(friend);
    });

    return next();
});

// Updates a Friend with the specified id
server.put('/friends/:id', function(req, res, next) {
    Friend.update({ _id: req.params.id }, req.params, function(err) {
        if (err)
            res.send(404);

        // Find the Friend that we just updated and return it to the caller.
        Friend.findById(req.params.id, function(err, friend) {
            if (!friend)
                res.send(404);

            // We only need to return the first friend that was found.
            res.json(friend);
        });
    });

    return next();
});

// Deletes a Friend by their database id.
server.del('/friends/:id', function(req, res, next) {
    Friend.remove({ _id: req.params.id }, function(err, friend) {
        if (err)
            res.send(404);

        // Find all friends in the database and return them to the caller.
        Friend.find(function(err, friends) {
            if (err)
                res.send(500);

            res.json(friends);
        });
    });

    return next();
});

// Start the new server.
server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
