let randomText = function randomText (length = 10){
    let randomText = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++)
        randomText += possible.charAt(Math.floor(Math.random() * possible.length));

    return randomText;
};

let nDaysFromNow = function nDaysFromNow(days=10) {
    let now = new Date();
    return now.setDate(now.getDate() + days)
};

let nHoursFromNow = function nHoursFromNow(hours=1) {
    let now = new Date();
    return now.setHours(now.getHours()+hours)
};

let nMinutesFromNow = function nMinutesFromNow(minutes=30) {
    let now = new Date();
    return now.setMinutes(now.getMinutes() + minutes)
};

let generateRandomExpiry = function generateRandomExpiry() {
    let months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    let years = ['18','19','20','21','22'];

    let randMonth = months[Math.floor(Math.random() * months.length)];
    let randYears = years[Math.floor(Math.random() * years.length)];



    return `${randMonth}/${randYears}`
};

let isNotEmpty = function isNotEmpty(string) {
    return !['NA','N/A','',null].includes(string)
};

module.exports = {
    randomText : randomText,
    nDaysFromNow : nDaysFromNow,
    nHoursFromNow : nHoursFromNow,
    nMinutesFromNow : nMinutesFromNow,
    generateRandomExpiry : generateRandomExpiry,
    isNotEmpty : isNotEmpty,
};