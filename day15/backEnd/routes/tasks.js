const express = require('express')
const { addNewTask,
        getAllTasks,
        getTaskByID,
        deleteTaskByID,
        updateTaskByID
} = require('../controller/taskController')
//includes

const router = express.Router()

//routes
//get all tasks
router.get('/' , getAllTasks)

//get one task
router.get('/:id' , getTaskByID)

//post a task
router.post('/' , addNewTask)

//delete a task
router.delete('/:id' , deleteTaskByID)

//update all tasks
router.patch('/:id' , updateTaskByID)

module.exports = router