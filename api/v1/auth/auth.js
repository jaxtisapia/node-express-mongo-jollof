let responseControl = require('../response/response');
let serveResponse = responseControl.serveResponse;
let responseTypes = responseControl.responseTypes;

let getUserBySession= require('../util/session').getUserBySession;


// userAuthenticate is supposed to be a middleware.
// It authenticates the user by sessionID variable in a post request. It then returns
// userDetails related to the sessionID when successful. Or returns error when error found


let userAuthenticate = function (req, res, next) {
    let sessionID = req.body.sessionID;

    getUserBySession(sessionID).then((data)=>{
        // if user is not found, throw an error message
        // TODO set a counter and ban user account after several attempts
        if (!data) res.send('no session for that sessionID');

        else return data; //
    })

        .then((user)=>{
            if (!user.verifications.isEmailVerified) res.send('email is not verified'); //check for unverified email
            if (user.verifications.isUserBanned) res.send('user is banned'); // check for banned user
            if (user.session.activeTill.getTime()<Date.now()) res.send('session  is expired'); // check for expired session

            // if no failure conditions, authenticate
            req.authData = user; // attach user data to req object
            next()
        }).catch((exception)=>{
            res.send('authentication error')
    })
};

module.exports = {
    userAuthenticate:userAuthenticate
};