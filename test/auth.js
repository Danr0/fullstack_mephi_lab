const jwt = require("jsonwebtoken");
const config = require('../config.js')


module.exports = function(req, res, next) {
    //get the token from the header if present
    //console.log(req.headers.cookie);
    let output = {};
    console.log(req.headers)
    console.log(req.headers.cookie);
    (req.headers.cookie).split(/\s*;\s*/).forEach(function(pair) {
        pair = pair.split(/\s*=\s*/);
        output[pair[0]] = pair.splice(1).join('=');
    });
    const token = req.headers["x-access-token"] || req.headers["authorization"] || output["x-access-token"];
    console.log(token);
    //if no token found, return response (without going to the next middelware)
    if (!token) {return res.status(401).send("Access denied. No token provided.")}

    try {
        //if can verify the token, set req.user and pass to next middleware
        const decoded = jwt.verify(token, config.private_key);
        req.user = decoded;
        next();
    } catch (ex) {
        //if invalid token
        return res.status(400).send("Invalid token.");
    }
};