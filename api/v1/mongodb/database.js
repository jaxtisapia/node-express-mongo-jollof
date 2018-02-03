let mongoose = require('mongoose');

let mongo_uri = 'mongodb://localhost:27017/malabar';

let db = mongoose.connect(mongo_uri);
mongoose.Promise = global.Promise;

exports.mongoose = mongoose;