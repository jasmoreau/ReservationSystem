const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./creds');

//////////////////////////////////////////////
// add for keroku use
app.use(express.static('public'));

// middleware
app.use(cors());
app.use(express.json());      //req.body

//ROUTES

//insert a demo
app.post('/demos', async(req, res)=>{
  try{

    const {key, description} = req.body;
    // console.log(key, description);
    const newDemo = await pool.query(`INSERT INTO demo (key, description) VALUES($1, $2) RETURNING *`,
      [key, description]);
    
    res.json(newDemo.rows[0]);          

  } catch(err){
    console.log(err.message);
  }
});

//get all demo
app.get('/demos', async(req, res)=>{
  try{
    const allDemos = await pool.query(`SELECT * FROM demo`);
    res.json(allDemos.rows);
    // console.log(allDemos);
  } catch(err){
    console.log(err.message);
  }
});

//get a demo by id
app.get('/demos/:id', async(req, res)=>{
  try{
    const { id } = req.params;
    const demo = await pool.query(`SELECT * FROM demo 
                                   WHERE key = $1`, 
      [id]);
    res.json(demo.rows);
  } catch(err){
    console.log(err.message);
  }
});

//update a demo by id
app.put("/demos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { key, description } = req.body;
    // console.log(key, description);
    const updateDemo = await pool.query(`UPDATE demo SET key = $2, description = $3 
                                         WHERE key = $1`,
      [id, key, description]);

    res.json({key, description})
  } catch (err) {
    console.error(err.message);
  }
});

//delete a demo by id
app.delete("/demos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const deleteDemo = await pool.query(`DELETE FROM demo 
                                         WHERE key = $1 RETURNING *`, 
      [id]);
    res.json(deleteDemo.rows[0]);

  } catch (err) {
    console.log(err.message);
  }
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// set up the server listening at port 5000 (the port number can be changed)
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
  console.log(`server has started on port ${port}`);
});