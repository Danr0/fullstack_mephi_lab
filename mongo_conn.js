const config = require('./config.js') //file with login and password
const mongoose = require('mongoose');

let dbname = 'test'; // change me
const uri = "mongodb+srv://"+config.mongo_user+":"+config.mongo_pass+"@cluster0.q2ea2.gcp.mongodb.net/"+dbname+"?retryWrites=true&w=majority";

// connect to db
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("connected")
});



// 3 variants to create dynamic schemas

//can add fields to schema
const var1 = new mongoose.Schema();
var1.add({ name: 'string', color: 'string', price: 'number' });


// unset strict
const var2 = new mongoose.Schema({
    name: String
},{ strict: false });  // if set in true, will save only fields in schema and ignore others


// or define Mixed type in schema for doing so
const var3 = new mongoose.Schema({ any: mongoose.Mixed });






// create simple Schema
const kittySchema = new mongoose.Schema({
    name: String
},{ strict: false });


// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
    const greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name";
    console.log(greeting);
}

// create model based on schema
let Kitten = mongoose.model('Kitten', kittySchema);

// create new document
const fluffy = new Kitten({ name: 'fluffy' });

// use method from schema
fluffy.speak();


// save it in DB
fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
    fluffy.speak();
});


// find started with fluff
Kitten.find({ name: /^fluff/ }, function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
});


// create new one
const red = new Kitten({name:"red",age:12})
// can save also age because of unsetted strict
red.save(function (err, fluffy) {
    if (err) return console.error(err);
    fluffy.speak();
});


// get all Kittens and after do callback function
Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
});


//insert one
Kitten.create({name:"Gea",color:"Brown"});

//insert many
const arr = [{ name: 'Dia' }, { name: 'Blue' }];
Kitten.insertMany(arr, function(error, docs) {});


Kitten.updateOne({age: {$exists:true}}, {age:13},function (err, fluffy) {
    if (err) return console.error(err);
});

const res = Kitten.deleteMany({ name: 'Blue' },function (err, kittens) {
    if (err) return console.error(err);});
console.log(res.deletedCount);

// mongoose.connection.close(); // have to w8 for all queries and saves!!!!!
