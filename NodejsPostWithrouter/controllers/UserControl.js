const pool = require('../db')
const { json } = require('express')
const express = require('express')

module.exports = {
    //get task
    get: async (req, res) => {
        try{
            const getTasks = await pool.query('Select * from todo');
            res.json(getTasks.rows)
        }catch(err)
        {
            console.error(err.message)
        }
    },
    //Post data
    post: async (req, res) => {
        try{
        console.log(req.body)
        const { description } = req.body;
        const newtask = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", 
        [description]
        );
        res.json(newtask.rows[0])
        }catch(err)
        {
            console.error(err.message)
        }
    },
    //Update data
    put: async (req, res) =>{
        try{
            const { id } = req.params
            const { description} = req.body

            const updateTasks = await pool.query("Update todo set description = $1 where todo_id = $2",
            [description, id])

            res.json("Update the description of the provided ID")
        }
        catch(err)
        {
            console.error(err.message)
        }
    },
    //Delete Data
    delete: async (req, res) => {
        try{
            const { id } = req.params
            const deleteTasks = await pool.query("delete from todo where todo_id = $1",
            [id])
            res.json("Deleted record successfully")
        }catch(err)
        {
            console.log(err.message)
        }
    }

}