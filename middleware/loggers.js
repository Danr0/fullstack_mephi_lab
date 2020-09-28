fs = require('fs');

function getDate(){
    let current_datetime = new Date();
    return current_datetime.getFullYear() +
        "-" +
        (current_datetime.getMonth() + 1) +
        "-" +
        current_datetime.getDate() +
        " " +
        current_datetime.getHours() +
        ":" +
        current_datetime.getMinutes() +
        ":" +
        current_datetime.getSeconds() +
        " ";
}

module.exports.pathLogger = function pathLogger(req, res, next) {
    console.log(""+getDate()+req.path);
    next();
};

module.exports.errorLoger = function errorLogger(req, res, next) {
    let originalSend = res.send;
    res.send = function(){
        //console.log(res.statusCode);
        if(res.statusCode === 403 ||
            res.statusCode === 404 ||
            res.statusCode === 500 ||
            res.statusCode === 401 ||
            res.statusCode === 400){
            let data = ""+getDate()+req.method+" "+req.path+" "+JSON.stringify(req.body)+"\n";
            fs.appendFile('./errorLog.txt', data, function (err) {
                console.log('Saved to file!');
            });
        }
        originalSend.apply(res, arguments);
    };
    next();
}



