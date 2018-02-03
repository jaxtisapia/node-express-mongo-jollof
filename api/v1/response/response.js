responseTypes = {
    SERVER_ERROR:"SERVER_ERROR",
    SESSION_EXPIRED:"SESSION EXPIRED",
    AUTHENTICATION_ERROR:"AUTHENTICATION ERROR",
    INSUFFICIENT_FUNDS:"INSUFFICIENT FUNDS",
    USER_CREATED:"USER CREATED",
    CREATE_USER_ERROR:"CREATE USER ERROR",
};

let serveResponse = function serveResponse(  res, responseType, data ) {

    switch (responseType){
        case responseTypes.SERVER_ERROR:
            res.send(`SERVER ERROR`);
            break;

        case responseTypes.SESSION_EXPIRED:
            res.send("SESSION EXPIRED");
            break;

        case responseTypes.AUTHENTICATION_ERROR:
            break;

        case responseTypes.INSUFFICIENT_FUNDS:
            break;

        case responseTypes.USER_CREATED:
            break;

        case responseTypes.CREATE_USER_ERROR:
            break;

        default:
            break;
    }

};

module.exports = {
    responseTypes:responseTypes,
    serveResponse:serveResponse
}