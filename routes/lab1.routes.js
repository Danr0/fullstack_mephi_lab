const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();


router.post("/ex2", auth, async (req, res) => {
    let arr = (req.body.arr).split(",");
    var combine = function(a, min) {
        var fn = function(n, src, got, all) {
            if (n == 0) {
                if (got.length > 0) {
                    all[all.length] = got;
                }
                return;
            }
            for (var j = 0; j < src.length; j++) {
                fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
            }
            return;
        }
        var all = [];
        for (var i = min; i < a.length; i++) {
            fn(i, a, [], all);
        }
        all.push(a);
        return all;
    };
    var subsets = combine(arr, 0);
    subsets.unshift([]);
    return res.send(subsets);
})


router.post("/ex12", auth, async (req, res) => {
        let str = (req.body.str);
        let ch = (req.body.ch1);
        if(str.search(ch)==-1){
            return res.status(400).send("Char not found");
        }
        else{
            let str2 = str.substr(str.search(ch)+1);
            if(str2.search(ch)!=-1){
                return res.status(400).send("Multiple chars detected")
            }
            else {
                return res.send(str2);
            }
        }


    })


router.post('/ex15', async (req, res) => {
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    let mail = (req.body.mail);
    return res.send(("" + validateEmail(mail) + "\n<div>/^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/<\div>"))
})

module.exports = router;