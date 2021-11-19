const express = require('express');
const os = require('os');
const cors = require('cors');
const pool = require('./db/creds.js');
const app = express();

app.use(cors());

// app.use(express.static('dist'));

app.get('/userInfo', async(req, res)=>{
    try{
      console.log('TEST');
      const allDemos = await pool.query(`SELECT * FROM user`);
    //   res.json(allDemos.rows);
      console.log(allDemos);
    } catch(err){
      console.log(err.message);
    }
});

// app.get('/userInfo', async(req, res)=>{
//     try{
//       const allDemos = await pool.query(`CREATE TABLE user (
//         userID SERIAL NOT NULL PRIMARY KEY,
//         username VARCHAR NOT NULL,
//         password VARCHAT NOT NULL); INSERT INTO user VALUES (test1, test123)`);
//     //   res.json(allDemos.rows);
//       console.log(allDemos);
//     } catch(err){
//       console.log(err.message);
//     }
// });
  

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
