// set global variable demos
let demos = []
// function to set demos
const setDemos = (data) => {
  demos = data;
}

// function edit demo
const editDemo = (id) => {

  const key = demos.filter(demo => demo.key === id)[0].key;
  const descrip = demos.filter(demo => demo.key === id)[0].description;
  document.querySelector('#edited-key').value = key;
  document.querySelector('#edited-description').value = descrip;
  document.querySelector('#save-edit-demo').addEventListener("click", function() {updateDemo(id)});

}

// function to display demos
const displayDemos = () => {
  demos.sort((a, b) => {
    return a.key - b.key;
  });
  const demoTable = document.querySelector('#demo-table');

  // display all demos by modifying the HTML in "demo-table"
  let tableHTML = "";
  demos.map(demo =>{
    tableHTML +=
    `<tr key=${demo.key}>
    <th>${demo.key}</th>
    <th>${demo.description}</th>
    <th><button class="btn btn-warning" type="button" data-toggle="modal" data-target="#edit-modal" onclick="editDemo(${demo.key})">Edit</button></th>
    <th><button class="btn btn-danger" type="button" onclick="deleteDemo(${demo.key})">Delete</button></th>
    </tr>`;
  })
  demoTable.innerHTML = tableHTML;

}

// select all the demos when the codes first run
selectDemos();


// The following are async function to select, insert, update and delete demos
// select all the demo
async function selectDemos() {
  // use try... catch... to catch error
  try {

    // GET all demos from "http://localhost:5000/demos"
    const response = await fetch("http://localhost:5000/demos")
    // connect to heroku, remove localhost:port
    // const response = await fetch("/demos")
    const jsonData = await response.json();
    // console.log(jsonData);

    setDemos(jsonData);
    displayDemos();
    // setTimeout(() => {
    //   console.log(demos);
    // }, 100);

  } catch (err) {
    console.log(err.message);
  }
}

// insert a new demo
async function insertDemo() {
  // read the demo description from input
  const inputKey = document.querySelector('#demo-key');
  const inputDesc = document.querySelector('#demo-description');
  const key = inputKey.value;
  const description = inputDesc.value;
  // console.log(key, description);

  // use try... catch... to catch error
  try {
    // insert new demo to "http://localhost:5000/demos", with "POST" method
    const body = { key: key, description: description };

    // connect to heroku, remove localhost:port
    const response = await fetch("http://localhost:5000/demos", {
    // const response = await fetch("/demos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const newDemo = await response.json();
    demos.push(newDemo);
    displayDemos();
    inputKey.value='';
    inputDesc.value='';

  } catch (err) {
    console.log(err.message);
  }
}

// delete a demo by id
async function deleteDemo(id) {
  try {
    // delete a demo from "http://localhost:5000/demos/${id}", with "DELETE" method
    // connect to heroku, remove localhost:port
    const deletedDemo = await fetch(`http://localhost:5000/demos/${id}`, {
    // const deletedDemo = await fetch(`/demos/${id}`, {
      method: "DELETE"
    })
    const deleteDemo = await deletedDemo.json();
    demos = demos.filter(demo => demo.key != deleteDemo.key);
    displayDemos();

  } catch (err) {
    console.log(err.message);
  }
}

// update a demo description
async function updateDemo(id) {
  
  const key = document.querySelector('#edited-key').value;
  const description = document.querySelector('#edited-description').value;
  // console.log(key)
  // console.log(description);

  try {
    // update a demo from "http://localhost:5000/demos/${id}", with "PUT" method
    // connect to heroku, remove localhost:port
    const body = {key: key, description: description};
    const response = await fetch(`http://localhost:5000/demos/${id}`, {
    // const response = await fetch(`/demos/${id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)
    })

    let demo = demos.find(t => t.key === id);
    demo.key = key;
    demo.description = description;
    displayDemos();

  } catch (err) {
    console.log(err.message);
  }
}