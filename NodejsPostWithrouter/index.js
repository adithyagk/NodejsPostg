const express = require('express');

const app = express();

const Rrouter = require('./routes/user')
app.use(express.json()) //use is like a stack, where we can append properties
app.use("/", Rrouter) //dont put anything like "/task" here becuase then you need to provide /task/task in postman, this is a common pathway

app.listen(3000, () =>{
    console.log("Listen to server")
})





