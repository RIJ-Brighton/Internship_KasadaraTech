const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema( {
    taskTitle : { type:String , required:true },
    taskPriority : {type:String , required:true},
    taskStatus : { type:Boolean , default:false },
    taskImg : {type:String , required:true}
} , { timestamps : true } )

module.exports = mongoose.model('Task' , taskSchema)