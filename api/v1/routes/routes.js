module.exports = function (app) {

    // v1 routes
    app.use('/v1/user', require('./user'));

};