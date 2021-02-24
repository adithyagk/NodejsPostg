const express = require('express')
const app = express();
const router = express.Router()
const controller = require('../controllers/UserControl')

router.get("/tasks", controller.get)
router.post("/tasks", controller.post)
router.put("/tasks/:id", controller.put)
router.delete("/tasks/:id", controller.delete)
//get data when used inside route for testing
/*router.get("/tasks", async (req,res) => {
    try{
        const getTasks = await pool.query('Select * from todo');
        res.json(getTasks.rows)
//         res.send("hi")
    }catch(err)
    {
        console.error(err.message)
    }
})*/

module.exports = router