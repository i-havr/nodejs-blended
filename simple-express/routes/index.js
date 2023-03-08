var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:id', function (req, res, next) {
  const { id } = req.params;
  const contact = contacts.filter(el => el.id === id);
  res.json(contact);
});

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  res.render('response', { title: 'Simple express app', email, password });
});

module.exports = router;
