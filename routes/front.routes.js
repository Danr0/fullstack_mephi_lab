const express = require("express");
const router = express.Router();
const pug = require('pug');


router.get("/", async (req, res) => {
    res.render('index', { error: false });
});

router.get("/api/Pogonin/lab1/ex2", async (req, res) => {
    res.render('ex2', { error: false });
});

router.get("/api/Pogonin/lab1/ex12", async (req, res) => {
    res.render('ex12', { error: false });
});

router.get("/api/Pogonin/lab1/ex15", async (req, res) => {
    res.render('ex15', { error: false });
});

module.exports = router;