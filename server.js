var restify = require('restify'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/restify_tutorial');

var Friend = mongoose.model('Friend', {
    firstName: String,
    lastName: String,
    birthdate: Date
});

var server = restify.createServer();
server.pre(restify.pre.sanitizePath());

server.use(restify.bodyParser());

server.post('/friends', function(req, res, next) {
    Friend.create({
        firstName: req.params.firstName,
        lastName: req.params.lastName,
        birthdate: new Date(req.params.birthdate)
    }, function(err, friend) {
        if (err)
            res.send(err);

        Friend.find(function(err, friends) {
            if (err)
                res.send(err);

            res.json(friends);
        });
    });

    return next();
});

server.get('/friends/:id', function(req, res, next) {
    Friend.find({ _id: req.params.id }, function(err, friend) {
        if (err)
            res.send(err);

        res.json(friend[0]);
    });

    return next();
});

server.get('/friends', function(req, res, next) {
    Friend.find(function(err, friends) {
        if (err)
            res.send(err);

        res.json(friends);
    });

    return next();
});

server.del('/friends/:id', function(req, res, next) {
    Friend.remove({ _id: req.params.id }, function(err, friend) {
        if (err)
            res.send(err);

        Friend.find(function(err, friends) {
            if (err)
                res.send(err);

            res.json(friends);
        });
    });

    return next();
});

server.put('/friends/:id', function(req, res, next) {

    var update = {}



    Friend.update({ _id: req.params.id }, req.params, function(err, friend) {
        if (err)
            res.send(err);

        res.json(friend);
    });

    return next();
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
