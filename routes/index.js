var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {});
});
router.get('/scooter', function(req, res){
	res.render('huabanche', {});
});
router.get('/contact', function(req, res){
	res.render('contact', {});
});
router.get('/about', function(req, res){
	res.render('about', {});
});

module.exports = router;
