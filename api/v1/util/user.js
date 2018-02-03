let User = require('../models/user').User;
let util = require('./util');
let sessionControl = require('./session');
let createSession = sessionControl.createSession;
let invalidateSession = sessionControl.invalidateSession;

// register User
let registerUser = (req, res) => {
    let requestBody = req.body;

    getUserByID(requestBody.id).then((data)=>{

        // if !(data), user is not found in database. ACTION: Register new user
        if (!data) return; // real registration happens here
        res.send('user has already been added to system. yikes!!!')

    }).then(()=>{

        // return created object session here.
        let user = new User({
            _id: requestBody.id,
            email:requestBody.email,
            phone:requestBody.phone,
            name:requestBody.name,
            password:{
                real:requestBody.password,
            }
        });

        return new Promise ((resolve, reject)=>{
            user.save((err, data)=>{
                if (err) reject(err);
                resolve(data)
            })})

    }).then((userData)=>{
        // TODO create a mailer and send user an email to confirm registration
        //ACTION: send user the session details. user can now access the app.
        res.send({session: userData.session})
    })

        .catch((exception)=>{ res.send(`${exception} error in server or something`) })
};

// login User
let loginUser = (req, res) => {
    let username = req.body.id;
    let password = req.body.password;

    createSession(username, password).then((document)=>{
        // if document.data is null, user not found
        let user = document.data;

        if (!user) { res.send('no user found') }

        else {

            // decide what to do with user verifications parameters. -banned -reported -deactivated
            if (!user.verifications.isEmailVerified) res.send('email address not verified yet');
            if (user.verifications.isUserBanned) res.send('user has been banned');

            // send session id when login is successful. user uses session id for authentication
            res.send({session_id: document.sessionID})
        }

    }).catch((exception)=>{
        res.send(`error in server or something`)
    })
};

// logoutUser
let logoutUser = (req, res) => {
    let user  = req.authData;

    invalidateSession(user._id).then((data)=>{
        res.send('logout successful')
    }).catch((exception)=>{
        res.send('error logging out')
    })

};

let getUserByID = (userID) => {
    return new Promise((resolve, reject) => {
        User.findOneAndUpdate({_id: userID}, {$set: {'session.lastActive': Date.now()}})
            .then((data, err) => {
                if (err) reject(err);
                resolve(data)
            })
    })
};

let getUserBySession = (sessionID) => {
    return new Promise((resolve, reject) => {
        User.findOneAndUpdate({'session.id': sessionID}, {$set: {'session.lastActive': Date.now}})
            .then((err, data) => {
                if (err) reject(err);
                resolve(data)
            })
    })
};

let getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        User.findOneAndUpdate({'email': email}, {$set: {'session.lastActive': Date.now}})
            .then((err, data) => {
                if (err) reject(err);
                resolve(data)
            })
    })
};


module.exports = {
    registerUser: registerUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
};