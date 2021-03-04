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

app.get('/getRate', function (req, res) {
  var weight = Number(req.query.weight);
  var typeinput = req.query.type;
  var zone = req.query.zone;
  var type;

  switch(typeinput) {
    case 'Stamped':
      if (weight <= 1) {
        type = .55;
        break;
      }
      if (weight > 1 && weight <= 2) {
        type = .75;
        break;
      }
      if (weight > 2 && weight <= 3) {
        type = .95;
        break;
      }
      if (weight > 3 && weight <= 3.5) {
        type = 1.15;
        break;
      }
      if (weight > 3.5) {
        typeinput = 'Flats';
      }

    case 'Metered':
      if (weight <= 1) {
        type = .51;
        break;
      }
      if (weight > 1 && weight <= 2) {
        type = .71;
        break;
      }
      if (weight > 2 && weight <= 3) {
        type = .91;
        break;
      }
      if (weight > 3 && weight <= 3.5) {
        type = 1.11;
        break;
      }
      if (weight > 3.5) {
        typeinput = 'Flats';
      }

    case 'Flats':
      if (weight <= 1) {
        type = 1;
        break;
      }
      if (weight > 1 && weight <= 2) {
        type = 1.2;
        break;
      }
      if (weight > 2 && weight <= 3) {
        type = 1.4;
        break;
      }
      if (weight > 3 && weight <= 4) {
        type = 1.6;
        break;
      }
      if (weight > 4 && weight <= 5) {
        type = 1.8;
        break;
      }
      if (weight > 5 && weight <= 6) {
        type = 2;
        break;
      }
      if (weight > 6 && weight <= 7) {
        type = 2.2;
      }
      if (weight > 7 && weight <= 8) {
        type = 2.4;
        break;
      }
      if (weight > 8 && weight <= 9) {
        type = 2.6;
        break;
      }
      if (weight > 9 && weight <= 10) {
        type = 2.8;
        break;
      }
      if (weight > 10 && weight <= 11) {
        type = 3;
        break;
      }
      if (weight > 11 && weight <= 12) {
        type = 3.2;
        break;
      }
      if (weight > 12 && weight <= 13) {
        type = 3.4;
        break;
      }
      break;

    case 'Package':
      switch(zone) {
        case '1&2':
          if (weight <= 4) {
            type = 4;
          }
          if (weight > 4 && weight <= 8) {
            type = 4.8;
          }
          if (weight > 8 && weight <= 12) {
            type = 5.5;
          }
          if (weight > 12 && weight <= 13) {
            type = 6.25;
          }
          break;

        case '3':
          if (weight <= 4) {
            type = 4.1;
          }
          if (weight > 4 && weight <= 8) {
            type = 4.85;
          }
          if (weight > 8 && weight <= 12) {
            type = 5.55;
          }
          if (weight > 12 && weight <= 13) {
            type = 6.30;
          }
          break;

        case '4':
          if (weight <= 4) {
            type = 4.15;
          }
          if (weight > 4 && weight <= 8) {
            type = 4.9;
          }
          if (weight > 8 && weight <= 12) {
            type = 5.6;
          }
          if (weight > 12 && weight <= 13) {
            type = 6.40;
          }
          break;

        case '5':
          if (weight <= 4) {
            type = 4.2;
          }
          if (weight > 4 && weight <= 8) {
            type = 4.95;
          }
          if (weight > 8 && weight <= 12) {
            type = 5.65;
          }
          if (weight > 12 && weight <= 13) {
            type = 6.50;
          }
          break;

        case '6':
          if (weight <= 4) {
            type = 4.25;
          }
          if (weight > 4 && weight <= 8) {
            type = 5;
          }
          if (weight > 8 && weight <= 12) {
            type = 5.7;
          }
          if (weight > 12 && weight <= 13) {
            type = 6.55;
          }
          break;

          case '7':
            if (weight <= 4) {
              type = 4.30;
            }
            if (weight > 4 && weight <= 8) {
              type = 5.1;
            }
            if (weight > 8 && weight <= 12) {
              type = 5.85;
            }
            if (weight > 12 && weight <= 13) {
              type = 6.65;
            }
            break;

            case '8':
            case '9':
              if (weight <= 4) {
                type = 4.45;
              }
              if (weight > 4 && weight <= 8) {
                type = 5.2;
              }
              if (weight > 8 && weight <= 12) {
                type = 5.95;
              }
              if (weight > 12 && weight <= 13) {
                type = 6.75;
              }
              break;
        }
      break;

    default:
      window.alert('Calculation Error. Is your weight 13oz or less?');
  }

  var cost = calculateRate(weight, type);

  var params = { weight: weight, type: type.toFixed(2), cost: cost, typeinput: typeinput };
  res.render('pages/cost', params);
})

function calculateRate(weight, type) {
  return (Math.round(((weight * type) + Number.EPSILON) * 100) / 100).toFixed(2);
}


//team activity week 9
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


