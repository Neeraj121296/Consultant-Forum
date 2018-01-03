const express = require("express");
const bodyParser = require("body-parser");
const userSchema = require("./db/schema");
var routeCache = require('route-cache');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var path = require('path');
const url = require('url');
const app = express();

app.use(cookieParser());
var dialog = require('dialog');
const validator = require("express-validator");
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
app.use(session({
    secret: "Shh, its a secret!", resave: true,
    saveUninitialized: false
}));

const POST = require("./models/Post");
const User = require("./models/User");
const CRUD = require("./db/crud");
const crudObject = new CRUD.UserOperations();
const crudObject2 = new CRUD.PostOperations();
app.use(express.static("public"));
var counter = 0;
app.use(bodyParser.urlencoded({ extended: false }));
var sess;
var postArray = [];
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.use(bodyParser.json());
app.use(validator());
// app.get('/welcome',(request,response)=>{
//         counter++;
//         var d = new Date();
//         response.send(`<h2>M.S DHONI FAN COUNT VISIT ${counter} times </h2><br> ::::  ${d}`);
// });

app.post('/register', (req, res, next) => {

    var userid = req.body.Email;
    var pwd = req.body.Password;
    var frstName = req.body.firstName;
    var surName = req.body.surName;
    var bday = req.body.bday;
    var gender = req.body.gender;
    var phone = req.body.phone;

    req.assert("bday").notEmpty();
    req.assert("Email").isEmail();
    req.assert("Password", 'passwords must be at least 5 chars long and contain one number').isLength({ min: 5 });
    req.assert("firstName", 'Invalidfirstname').notEmpty();
    req.assert("surName", 'Invalidlastname').notEmpty();
    req.assert("phone", "contains only number and length will be 10 digits").isNumeric().isLength({ min: 10 });
    var errors = req.validationErrors(true);
    if (!errors) {

        userSchema.UserSchema.find({ "userid": userid }, (error, docs) => {
            if (error) { response.send('SOME DB PROBLEM OCCUR'); }
            else
                if (docs.length == 0) {
                    var userObject = new User(frstName, surName, userid, pwd, bday, gender, phone);
                    // console.log("Inside Register ",userObject);
                    crudObject.addUser(userObject, res);

                    sess = req.session;
                    sess.username = req.body.Email;
                    //console.log("username in session is",sess.username);

                }

                else
                    if (docs.length >= 1) {
                        //   console.log("userid is already exists",docs[0]);
                        dialog.err("Userid already exists");
                        res.redirect(req.get('referer'));

                    }


        })


    }
    else {
        dialog.err(JSON.stringify(errors));
        res.redirect(req.get('referer'));
        //  res.send('Errors:'+JSON.stringify(errors),400);
        return;
    }


});
app.post('/postDataPrint', function (req, res) {
    userSchema.PostSchema.find().sort({ $natural: -1 }).exec(function (error, docs) {
        //db.foo.find().sort({$natural:1}).limit(50);

        if (docs.length >= 1) {

            console.log("docs post print", docs);
        }
  
        res.json({ 'postprint': docs });
    })

})
app.post('/postdata', function (req, res, next) {
    var post_data = req.body;
    // console.log(JSON.parse("aftr parse",post_data.posts));
    console.log("data is", post_data);
  
    var postObject = new POST(post_data.posts);
    console.log("post oobject", postObject.posts);
    crudObject2.addPost(postObject.posts);
   
});
app.get('/logout', function (req, res, next) {
    req.session.destroy();

    routeCache.removeCache('/HomePage');
    res.redirect('/');
})
app.get('/HomePage', function (req, res, next) {
    sess = req.session.username;
    //   sess.username=req.body.Email;
    if (sess != undefined) {

        // console.log(req.session.username);
        // console.log("true user");
        res.sendFile(path.join(__dirname, '../', 'PROJECTC', 'views', 'HomePage.html'));


    }
    else {
        res.redirect('/index.html');

    }

});
var userid;
var pwd;
app.post('/HomePage', (req, res) => {
    console.log("Request ", req.body);
    userid = req.body.emailId;
    pwd = req.body.Password;

    var userObject = new User('', '', userid, pwd, '', '', '');
    console.log(pwd);
    console.log(userid);
    crudObject.fetchUser(userObject, res);
    //crudObject2.fetchPost(res);
    //res.cookie('name', 'express').send('cookie set');
    //console.log("Request first name is  ",firstName);
    sess = req.session;
    sess.username = req.body.emailId;

    //console.log(req.session);

    app.post('/data', function (req, res) {

        userSchema.UserSchema.find({ "userid": userid, "password": pwd }, (error, docs) => {
            if (error) { response.send('SOME DB PROBLEM OCCUR'); }
            else
                if (docs.length == 0) {

                    response.send('Userid or Password is Invalid');
                }

                else
                    if (docs.length >= 1) {
                        //    console.log("docs print",docs[0]);
                    }
            console.log("docs firstName in inside post", docs);

            res.json({ 'uid': docs[0].firstName });
        })



    });
});

app.listen(1234, () => {
    console.log("server start");
    //crudObject2.fetchPost();
})