const { json } = require('express');
const express = require('express')

const app = express();

const pool = require('./db')

app.use(express.json())

//Routes

//Post data

app.post("/tasks", async(req,res) =>{
    try{
        //await
        console.log(req.body)
        const { description } = req.body;
        const newtask = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", 
        [description]
        );
        res.json(newtask.rows[0])
    }
    catch(err){
        console.error(err.message)
    }
})

//get data
app.get('/tasks', async (req,res) => {
    try{
        const getTasks = await pool.query('Select * from todo');
        res.json(getTasks.rows)
    }catch(err)
    {
        console.error(err.message)
    }
})

//get a single data or data associated with id

app.get('/tasks/:id', async(req,res) => {
    try{
        const { id } = req.params
        const getSingleTasks = await pool.query("Select * from todo where todo_id = ($1)",
        [id])

        res.json(getSingleTasks.rows[0])
    }
    catch(err){
        console.error(err.message)
    }
})

//Update data on the table

app.put('/tasks/:id', async (req,res) => {
    try{
        const { id } = req.params
        const { description} = req.body

        const updateTasks = await pool.query("Update todo set description = $1 where todo_id = $2",
        [description, id])

        res.json("Update the description of the provided ID")
    }
    catch(err){
        console.error(err.message)
    }

})

//Delete Records
    app.delete('/tasks/:id', async (req, res) => {
        try{
            const { id } = req.params

            const deleteTasks = await pool.query("delete from todo where todo_id = $1",
            [id])
            res.json("Deleted successfully")
        }
        catch(err){
            console.error(err.message)

        }
    })



app.listen(3000, () =>{
    console.log("Listen to server")
})