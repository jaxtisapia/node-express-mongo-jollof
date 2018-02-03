let utilControl = require('../util/util');
let sessionConfig = require('../config/config').session;

// Object.assign to combine queries - Use a combination of two or more queries

// predefined setter queries
let sessionExtend = {'session.activeTill':utilControl.nMinutesFromNow(sessionConfig.extensionDuration)};
let sessionInvalidate = {'session.activeTill':utilControl.nDaysFromNow(sessionConfig.invalidateDuration)};
let sessionLastActive = {'session.lastActive':Date.now()};
let activateRealPassword = {'password.is_real_password_active':true};
let deactivateRealPassword = {'password.is_real_password_active':false};

module.exports = {
    sessionExtend:sessionExtend,
    sessionInvalidate:sessionInvalidate,
    sessionLastActive:sessionLastActive,
    activateRealPassword:activateRealPassword,
    deactivateRealPassword:deactivateRealPassword,
};

