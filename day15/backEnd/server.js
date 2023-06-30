require('dotenv').config()

const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const taskRoutes = require('./routes/tasks')
const userRoutes = require('./routes/users')
//requires end

//init app
const app = express()

//middleware
app.use(cors({
    origin:'http://localhost:3000' 
}))
app.use(express.json()) //req body
app.use((req , res , next) => {
    console.log(req.path , req.method)
    next()
})

//routes
app.use('/api/tasks' , taskRoutes) //tasks
app.use('/api/user' , userRoutes)//users

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