
const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json())
//app.get('/todos/:id',(req,res)=>{})  BOUNUS
app.get('/todos', (req, res) => {


    let todos = JSON.parse(fs.readFileSync("./todos.json", "utf8"));
    res.send(todos);
})
app.patch('/patch/todos/:id', (req, res) => {
    let { id } = req.params.id;
    // console.log(req.body);
    console.log(id);
    let { title } = req.body;
    let todos = JSON.parse(fs.readFileSync("./todos.json", "utf8"));
    let todo = todos.find((todo) => todo.id == id)
    if (todo) {
        todo.title = title;
        fs.writeFileSync("./todos.json", JSON.stringify(todos));
        res.json({ message: "Edited ", data: todo })
    } else {
        res.json({ message: "SORRY there is no todo Found with this id" })
    }
})

app.post('/post/todos', (req, res) => {
    let { id } = req.body
    let { title } = req.body;
    let todos = JSON.parse(fs.readFileSync("./todos.json", "utf8"));
    todos.push({ id: id, title: title })
    fs.writeFileSync("./todos.json", JSON.stringify(todos));
    res.json({ message: "added successfully ", data: todos })


})

app.get('/todos/:id', (req, res) => {
    let id = req.params.id;
    let todos = JSON.parse(fs.readFileSync("./todos.json", "utf8"));
    for (let i = 0; i < todos.length; i++) {
        let element = todos[i];
        if (element.id == id) {
            res.send(element)
        }
    }
})

app.delete('/todos/:id', (req, res) => {
    let id = req.params.id
    let todos = JSON.parse(fs.readFileSync("./todos.json", "utf8"));
    let todo = todos.find((todo) => todo.id == id);
    if (todo) {
        todos.splice(todo, 1);
        fs.writeFileSync("./todos.json", JSON.stringify(todos));
        res.json({ message: "deleted successfully ", data: todos })
    } else {
        res.json({ message: "not found ", data: todos })
    }
})

app.put('/put/todos/:id', (req, res) => {
    let  id  = req.params.id;   
    let { title } = req.body;
    let todos = JSON.parse(fs.readFileSync("./todos.json", "utf8"));
    let todo = todos.find((todo) => todo.id == id)
    if (todo) {
        todo.title = title;
        fs.writeFileSync("./todos.json", JSON.stringify(todos));
        res.json({ message: "Edited ", data: todo })
    } else {
        res.json({ message: "SORRY there is no todo Found with this id" })
    }
})




app.listen(3000, () => {
    console.log("Your server started on PORT 3000");

}) 