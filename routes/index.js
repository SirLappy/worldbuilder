var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/about', function(req, res) {
    res.render('pages/about', { title: 'Hello, World!' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('pages/userlist', {
            "userlist" : docs
        });
    });
});

module.exports = router;
