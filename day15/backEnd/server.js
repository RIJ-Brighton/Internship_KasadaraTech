require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const taskRoutes = require('./routes/tasks') 
//requires end

//init app
const app = express()

//middleware
app.use(express.json()) //req body
app.use((req , res , next) => {
    console.log(req.path , req.method)
    next()
})

//routes
app.use('/api/tasks' , taskRoutes)

//db connection
mongoose.connect(process.env.DB)
.then(() => {
    console.log('Connected to DB')
    //start server
    app.listen(process.env.PORT , () => {
        console.log('Server Strted!!')
    })
})
.catch((e)=>{console.log('error',e)})