const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express()
app.use(express.urlencoded({
  extended: true
}))

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
//app.use(bodyParser.urlencoded({ extended: true}))

app.get('/math', function (req, res) {
  var firstnumber = Number(req.query.firstnumber);
  var operator = req.query.operator;
  var secondnumber = Number(req.query.secondnumber);
  var total = calc(firstnumber, secondnumber, operator);

  var params = {
    firstnumber: firstnumber,
    secondnumber: secondnumber,
    operator: operator,
    total: total
  };

  res.render('pages/result', params);
})

  app.get('/math_service', function (req, res) {

  var firstnumber = req.query.firstnumber;
  var operator = req.query.operator;
  var secondnumber = req.query.secondnumber;
  var total = calc(firstnumber, secondnumber, operator);

  var params = {firstnumber: firstnumber, secondnumber: secondnumber, operator: operator, total: total};

  var result = res.json(params);
  res.render(result);
})

function calc(firstnumber, secondnumber, operator) {
  if (operator == '+') {
    total = firstnumber + secondnumber;
  } else if (operator == '-') {
    total = firstnumber - secondnumber;
  } else if (operator == 'x') {
    total = firstnumber * secondnumber;
  } else if (operator == '/') {
    total = firstnumber / secondnumber;
  }
  return total;
}


