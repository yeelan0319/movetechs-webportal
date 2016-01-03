var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {});
});
router.get('/scooter-k1', function(req, res){
	res.render('scooterk1', {});
});
router.get('/scooter-l1', function(req, res){
	res.render('scooterl1', {});
});
router.get('/about', function(req, res){
	res.render('about', {});
});
router.get('/future', function(req, res) {
	res.render('future', {});
});
router.get('/contact', function(req, res){
	res.render('contact', {});
});
router.get('/wechat', function(req, res){
	res.render('wechat', {});
});

/*redirect*/
router.get('/scooter', function(req, res){
	res.redirect('/scooter-k1');
});

module.exports = router;
