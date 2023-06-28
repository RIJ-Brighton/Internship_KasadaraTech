const taskModel = require('../models/taskModel')
const mongoose = require('mongoose')
//includes

//add new task
const addNewTask = async (req , res) => {
    const { taskTitle , taskStatus } = req.body
    try{
        const tasks = await taskModel.create({taskTitle , taskStatus})
        res.status(201).json(tasks)
    }catch(e){
        res.status(400).json({error:e.message})
    }
}

//get all tasks
const getAllTasks = async (req , res) => {
    try{
        const tasks = await taskModel.find({}).sort({crearedAt:1})
        res.status(200).json(tasks)
    }catch(e){
        res.status(500).json({error:e.message})
    }
}

//get task by ID
const getTaskByID = async (req , res) => {
    try{
        const { id } = req.params
        if(!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({error:'Invalid document ID'})
        
        const task = await taskModel.findById(id)
        if(!task)
            res.status(404).json({error:'Task isnt found'})
        else
            res.status(200).json(task)
    }catch(e){
        res.status(500).json({error:e.message})
    }
}

//delete by ID
const deleteTaskByID = async (req , res) => {
    try{
        const { id } = req.params
        if(!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json({error:'Invalid document ID'})
        
        const deletedTask = await taskModel.findOneAndDelete({_id:id})
        if(!deletedTask)
            res.status(500).json({error:'Task cant be deleted'})
        else
            res.status(200).json(deletedTask)
    }catch(e){
        res.status(500).json({error:e.message})
    }
}

//update by ID
const updateTaskByID = async (req , res) => {
    try{
        const { id } = req.params
        if(!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json({error:'Invalid document ID'})
        
        const updatedTask = await taskModel.findOneAndUpdate({_id:id} , {...req.body})
        if(!updatedTask)
            res.status(500).json({error:'Task cant be updated'})
        else
            res.status(201).json(updatedTask)
    }catch(e){
        res.status(500).json({error:e.message})
    }
}

module.exports = {
    addNewTask,
    getAllTasks,
    getTaskByID,
    deleteTaskByID,
    updateTaskByID
}