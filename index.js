let express = require('express');
let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.json());

// mongo database inclusion
require('./api/v1/mongodb/database');

// routes inclusion
require('./api/v1/routes/routes')(app);

app.get('/hello', (req, res)=>{
    res.send('hello world');
});

// Error Handling
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
});

app.listen(3000, function(){
});