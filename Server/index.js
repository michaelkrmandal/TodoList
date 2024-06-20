const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require("./Models/Todo")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/todo')

//index or read route
app.get("/get", (req, res) => {
  TodoModel.find()
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

//create route
app.post("/add", (req, res) => {
  const {task} = req.body;

  TodoModel.create({
    task: task
  }).then(result => res.json(result))
  .catch(err => res.json(err))
})

//update route
app.put("/update/:id", (req, res) => {
  const {id} = req.params;
  TodoModel.findByIdAndUpdate(id, {done: true})
  .then(result => res.json(result))
  .catch(err => res.json(err))
})


// delete route 
app.delete("/delete/:id", (req, res) => {
  const {id} = req.params;
  TodoModel.findByIdAndDelete(id)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

app.listen(8080, () => {
  console.log("server listening to port 8080");
})