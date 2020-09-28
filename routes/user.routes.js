const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const { User, validate, validateNoEmail } = require("../models/user.model");
const express = require("express");
const router = express.Router();

router.get("/current", auth, async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
});

router.post("/register", async (req, res) => {
    // validate the request body first

    const { error, value } = validate(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);


    //find an existing user
    let user = await User.findOne({ name: req.body.username });
    if (user) return res.status(400).send("User already registered.");

    user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();

    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send({
        _id: user._id,
        name: user.username,
        email: user.email
    });
});


router.post("/login", async (req, res) => {
    // validate the request body first
    //console.log(JSON.stringify(req.body));

    const { error, value } = validateNoEmail(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);


    //find an existing user
    let user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send("User not registered");
    bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
        if (err) {
            return res.status(500).send(err);
        } else if (!isMatch) {
            return res.status(400).send("Password is incorrect");
        } else {
            const token = user.generateAuthToken();
            //res.set('Set-Cookie', 'x-access-token='+token);
            res.cookie('x-access-token',token, { maxAge: 900000, httpOnly: true });
            res.header("x-access-token", token).send({
                _id: user._id,
                name: user.username,
                email: user.email
            });
        }
    })


});

module.exports = router;