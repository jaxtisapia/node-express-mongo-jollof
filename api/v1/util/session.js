let User = require('../models/user').User;
let util = require('./util');

let queriesControl = require('../mongodb/queries');

let getUserBySession = async (sessionID) => {
    let promise =  new Promise((resolve, reject) =>{
        User.findOne({'session.id':sessionID}, function (err, data) {
            if (err) reject (err);
            resolve(data)
        })
    });

    return await promise;
};


let extendSessionDuration = function extendSessionDuration(sessionID) {
   return new Promise((resolve, reject)=>{
       User.updateOne({'session.id':sessionID},
           {$set: queriesControl.sessionExtend },

           (err, data) => {
           if (err) reject(err);
           resolve(data)
           })
   })
};


let createSession = async (username, password) => {
    let sessionID = `${util.randomText(15)}${username}`;

    return new Promise((resolve, reject)=>{
        User.findOneAndUpdate({
                // query -> if id == username and password == {real password OR temporary password }
                $and:[{$or:[{'password.real':password}, {'password.temp':password}]},
                    {_id:username}]
            },

            // set a new session and set expiry date n=30 minutes from now
            {$set: Object.assign({'session.id':sessionID},
                queriesControl.sessionLastActive,
                queriesControl.sessionExtend)},

            // return function
            (err, data) => {
                if (err) reject(err);
                resolve({data:data, sessionID:sessionID});
            })
    })
};

let invalidateSession = function invalidateSession(id) {
    // just set activeTill Date to a day before to invalidate it
    return new Promise((resolve, reject)=>{
        User.updateOne({_id:id},

            // Object.assign to combine queries
            {$set:  Object.assign(queriesControl.sessionInvalidate, queriesControl.sessionLastActive)},

            (err, data) =>{
                if (err) reject(err);
                resolve(data)
            })
    })
};


module.exports = {
    getUserBySession : getUserBySession,
    extendSessionDuration : extendSessionDuration,
    createSession : createSession,
    invalidateSession : invalidateSession,
};