const express = require("express")
const router = express.Router()
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const requireLogin = require("../middleware/requireLogin")

router.get("/",requireLogin,(req,res)=>{
    res.send("hello agein")
})


router.post("/signup",(req,res)=>{
    const {name,email,password}= req.body
    if(!email || !password || !name){
        return res.status(422).json({
            error:"fields are mandatory"
        })
    }
    User.findOne({email},(err,user)=>{
        if(user){
            return res.status(422).json({error:"user already exist"})
        }
        bcrypt.hash(password,12).then(hashedPassword=>{
            const userData = new User({name,email,password:hashedPassword})
            userData.save((err,users)=>{
                if(err || !users){
                return res.status(422).json({error:"some error occured"})
                }
                res.json({
                    users
                })
            })  
        })
    })
})


router.post("/signin",(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(422).json({error:"please provide email and password"})
    }
    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(422).json({error:"some error occured"})
        }
        bcrypt.compare(password,user.password).then(doMatch=>{
            if(!doMatch){
                return res.status(400).json({error:"invalid email or password"})
            }
            else{
                const token = jwt.sign({_id:user._id},"mohitmalviya")
                return res.json({token,user})
            } 
        }).catch(err=>console.log(err))  
    })
})

module.exports= router