const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const config = require('../config.js')

//simple schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    }
});


//custom method to generate authToken
UserSchema.methods.generateAuthToken = function() {
    const key = config.private_key;
    const token = jwt.sign({ _id: this._id}, key, {
        expiresIn: 6000 // in seconds
    }); //get the private key from the config file -> environment variable
    return token;
}

const User = mongoose.model('User', UserSchema);

//function to validate user
function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(3).max(255).required()
    });
    return schema.validate(user);
}

function validateUserWithoutEmail(user) {
    const schema = Joi.object({
        username: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(3).max(255).required()
    });
    return schema.validate(user);
}


exports.User = User;
exports.validate = validateUser;
exports.validateNoEmail = validateUserWithoutEmail;