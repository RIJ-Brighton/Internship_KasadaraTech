const userModel = require('../models/userModel')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//includes

//sign user
const signUser = _id => jwt.sign({_id} , process.env.PRIVATE_KEY , {expiresIn:'1d'}) 

//login
const loginUser = async (req , res) => {
    const { username , password } = req.body
    try{
        const exists = await userModel.findOne({username})
        if(!exists){
            res.status(400).json({error : 'User Not Found'})
            return
        }
        const validate = await bcrypt.compare(password , exists.password)
        if(!validate){
            res.status(400).json({error : 'Incorrect Password'})
            return
        }
        //gen token
        const token = signUser(exists._id)

        res.status(200).json({username , token})
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

//signup
const signupUser = async (req , res) => {
    const {username , email , password} = req.body
    try{
        const unameExists = await userModel.findOne({username})
        if(unameExists){
            res.status(400).json({error : 'Username Already Exists'})
            return
        }
        
        const emailExists = await userModel.findOne({email})
        if(emailExists){
            res.status(400).json({error : 'Email Already Esists'})
            return
        }
        
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password , salt)
        const usr = await userModel.create({username , email , password : hash})

        //gen token
        const token = signUser(usr._id)

        res.status(200).json({username , token})
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

module.exports = {
    loginUser,
    signupUser
}