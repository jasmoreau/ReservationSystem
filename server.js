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
const config = require('./config');
const app = express();
  const stripe = require("stripe")(process.env.STRIPE_KEY)

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

app.post("/logout", function(req, res) {
  try{
  console.log("here")
  res.clearCookie('token')
  res.json("HERE")
}
catch(e){
  console.log(e)
}
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
      res.json([{'userid': null,'email': null,'first_name': null,"last_name": null,"mailing_addr": null,"billing_addr": null,"points": null,"preferred_payment": null, "phone": null}])
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
    var {userid,
            email,
            first_name,
            last_name,
            mailing_addr,
            billing_addr,
            points,
            preferred_payment,
            phone} = req.body;
    if(phone == '')
      phone = "NULL"
    const res = await pool.query(`UPDATE customer SET phone=`+phone+`, first_name='`+first_name+`', last_name='`+last_name+`', mailing_addr='`+mailing_addr+`', billing_addr='`+billing_addr+`', preferred_payment='`+preferred_payment+`'
    WHERE email = '`+req.email+`';`);

  }catch(err){
    console.log(err.message)
  }
});

app.post('/checkowner', async(req, res) => {
  try{
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

    if(req.email && req.email=="owner@email.com"){
      res.json(1)
    }
    else{
      res.json(0)
    }

  }catch(err){
    console.log(err.message)
  }
});

app.post('/addtable', async(req, res) => {
  try{
    const res = await pool.query(`INSERT INTO tables (id, max_size) VALUES (`+req.body.id+`, `+req.body.max_size+`)`)
  }catch(err){
    console.log(err.message)
  }
});

app.post('/deletetable', async(req, res) => {
  try{
    const res = await pool.query(`DELETE FROM tables WHERE id = `+req.body.id+``)
  }catch(err){
    console.log(err.message)
  }
});

app.post('/gettables', async(req, res) => {
  try{
    const data = await pool.query(`SELECT * FROM tables;`)
    res.json(data.rows)
  }catch(err){
    console.log(err.message)
  }
});


app.post('/makeReservation', async(req, res) => {
  try{
    var query = `INSERT INTO reservations (datetime, tableid, name, phone, email, paid`
    if(req.body.dinerid !="")
      query += `, dinerid)`
    else
      query += `)`

    query += ` VALUES ('`+req.body.datetime+`', `+req.body.tableid+`, '`+req.body.name+`', `+req.body.phone+`, '`+req.body.email+`', '`+req.body.paid+`'`;
    
    if(req.body.dinerid != "")
      query += `, `+req.body.dinerid+`);`
    else
      query += `);`
    console.log(query)
    const userData = await pool.query(query)
    res.json(userData.rows)
  }
  catch(err){
    console.log(err.message)
  }
})

app.post('/addcombination', async(req, res) => {
  try{
    const userData = await pool.query(`
    INSERT INTO combinations VALUES ('`+req.body.tables+`', '`+req.body.datetime+`')
    `)
    res.json(userData.rows)
  }
  catch(err){
    console.log(err.message)
  }
})

app.post('/getcombination', async(req, res) => {
  try{
    const userData = await pool.query(`
    SELECT * FROM combinations WHERE datetime>='`+req.body.startDate+`' AND datetime<='`+req.body.endDate+`';
    `)
    res.json(userData.rows)
  }
  catch(err){
    console.log(err.message)
  }
})


app.get('/api/getKey', async(req, res) => {
  try{
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // Specify amount here
      currency: "usd" // Specify currency here
    });

    res.json({clientSecret: paymentIntent.client_secret});
  }
  catch(err){
    console.log(err.message);
  }
})

app.listen(process.env.PORT || 8080);
