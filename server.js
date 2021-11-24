const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/User');
const withAuth = require('./middleware');
const pool = require('./creds.js');
const { application } = require('express');
const app = express();

const secret = 'mysecretsshhh';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const mongo_uri = 'mongodb+srv://tuan123:tuan123@ressystem.vnzft.mongodb.net/ResSystem?retryWrites=true&w=majority';
mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/home', function(req, res) {
  res.send('Welcome!');
});

app.get('/api/secret', withAuth, function(req, res) {
  res.send('The password is potato');
});

app.post('/api/register', function(req, res) {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.save(function(err) {
    if (err) {
      console.log(err);
      res.status(500).send("Error registering new user please try again.");
    } else {
      res.status(200).send("Welcome to the club!");

      pool.query(`INSERT INTO customer (email) VALUES ('`+email+`')`);
    }
  });
});

app.post('/api/authenticate', function(req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
        error: 'Internal error please try again'
      });
    } else if (!user) {
      res.status(401)
        .json({
        error: 'Incorrect email or password'
      });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
            error: 'Internal error please try again'
          });
        } else if (!same) {
          res.status(401)
            .json({
            error: 'Incorrect email or password'
          });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          res.cookie('token', token, { httpOnly: true }).sendStatus(200);
        }
      });
    }
  });
});

app.get('/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});

app.post('/api/search', async(req, res)=>{
  try{
    //console.log(req.body.dateTime)
    const query = "(SELECT t1.ID, t1.max_size \
      FROM tables t1 \
      LEFT JOIN reservations t2 \
      ON t2.tableid = t1.id \
      WHERE t2.tableid is null) \
      UNION \
      (SELECT tableID, max_size \
      FROM reservations t1 \
      JOIN tables \
      ON t1.tableID = ID \
      WHERE t1.datetime != '" + req.body.dateTime + "' \
      AND NOT EXISTS \
      (SELECT tableID \
      FROM reservations t2 \
      JOIN tables \
      ON t2.tableID = ID \
      WHERE datetime = '" + req.body.dateTime + "' \
      AND t1.tableID = t2.tableID));"
    const allData = await pool.query(query);
    console.log(allData.rows);
    res.json(allData.rows);

  } catch(err){
    console.log(err.message);
  }
});

app.post('/getdata', async(req, res) => {
  try{
    var user = false;

    const token = 
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;

    if (!token) {
    } else {
      jwt.verify(token, secret, function(err, decoded) {
        if (!err) {
          user = true;
          req.email = decoded.email;
        }
      });
    }

    if(!user)
      res.json([{'userid': null,'email': null,'first_name': null,"last_name": null,"mailing_addr": null,"billing_addr": null,"points": null,"preferred_payment": null}])
    else{
      const userData = await pool.query(`SELECT * FROM customer WHERE email LIKE '`+req.email+`' LIMIT 1;`)
      console.log(userData.rows)
      res.json(userData.rows)
    }
    
  }

catch(err){
  console.log(err.message);
}
});

app.post('/updateData', withAuth, async(req, res) => {
  try{
    const {userid,
            email,
            first_name,
            last_name,
            mailing_addr,
            billing_addr,
            points,
            preferred_payment} = req.body;

    
  }catch(err){
    console.log(err.message)
  }
});


// app.post('/getdata', withAuth, async(req, res) => {
//   try{
//     const email = ""
//     if(req.email)
//       email = req.email
//     if(email.length > 0){
//       const userData = await pool.query(`SELECT * FROM customer WHERE email LIKE'`+req.email+`' LIMIT 1;`)
//       res.json(userData.rows)
//     }
//     else{
//       res.json(`{"userid": null,"email": null,"first_name": null,"last_name": null,"mailing_addr": null,"billing_addr": null,"points": null,"preferred_payment": null}`)
//     }
//     res.json("BALLS")
//   }
//   catch(err){
//     console.log(err.message)
//   }
// })


app.post('/api/reserve', async(req, res) => {
  try{
    //TODO
  }
  catch(err){
    console.log(err.message);
  }
})



app.listen(process.env.PORT || 8080);
