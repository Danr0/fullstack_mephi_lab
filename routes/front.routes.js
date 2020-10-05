const express = require("express");
const router = express.Router();
const pug = require('pug');
const passport = require("passport");


router.get("/", passport.authenticate(`jwt`, { successRedirect: '/api/users/current',failureRedirect: '/login', session: false }), async (req, res) => {
    //res.render('profile', { user: req.user._id });
    //res.send();
});

router.get("/login", async (req, res) => {
    res.render('login', { error: false });
});

router.get("/register", async (req, res) => {
    res.render('register', { error: false });
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


router.get("/api/Pogonin/lab1/ex2",passport.authenticate(`jwt`, { session: false }), async (req, res) => {
    res.render('ex2', { error: false });
});

router.get("/api/Pogonin/lab1/ex12",passport.authenticate(`jwt`, { session: false }), async (req, res) => {
    res.render('ex12', { error: false });
});

router.get("/api/Pogonin/lab1/ex15",passport.authenticate(`jwt`, { session: false }), async (req, res) => {
    res.render('ex15', { error: false });
});

module.exports = router;