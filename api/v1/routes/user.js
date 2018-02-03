let express = require('express');
let router = express.Router();

let userAuthenticate = require('../auth/auth').userAuthenticate;

let userControl = require('../util/user');
let registerUser = userControl.registerUser;
let loginUser = userControl.loginUser;
let logoutUser = userControl.logoutUser;


// register user
// {   "id":"",
//     "email":"",
//     "phone":"",
//     "name":"",
//     "password":"",
// }
router.post('/',
    (req, res) => registerUser(req, res)
);


// login
// { "id":"",
// "password":""}
router.post('/login',
    (req, res) => loginUser(req, res)
);


// logout
// {
//     "sessionID":""
// }
router.post('/logout',
    (req, res, next) =>  userAuthenticate(req, res, next),
    (req, res) => logoutUser(req, res)
);


module.exports = router;