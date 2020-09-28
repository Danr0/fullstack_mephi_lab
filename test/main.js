const express = require('express')
const app = express()
const port = 3000


function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/Familiyamya/lab1/ex2', function (req, res) {
    let arr = (req.query.arr).split(",");
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
    res.send(subsets);
})

app.get('/api/Familiyamya/lab1/ex12', function (req, res) {
    let str = (req.query.str);
    let ch = (req.query.ch);
    if(str.search(ch)==-1){
        res.send("Char not found");
    }
    else{
        let str2 = str.substr(str.search(ch)+1);
        if(str2.search(ch)!=-1){
            res.send("Multiple chars detected")
        }
        else {
            res.send(str2);
        }
    }


})

app.get('/api/Familiyamya/lab1/ex15', function (req, res) {
    let mail = (req.query.mail);
    res.send(("" + validateEmail(mail) + "\n<div>/^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/<\div>"))
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})