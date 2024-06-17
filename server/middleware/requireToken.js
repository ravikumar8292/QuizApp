const jwt  = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../model/userSchema');
require('dotenv').config();

const jwtkey = process.env.JWTKEY;

module.exports = (req,res,next)=>{
    const { authorization } = req.headers;
    if(!authorization){
        return res.status(401).send({error:"you must be logged in"})
    } 
    const token = authorization.replace("Baerer ","");
    jwt.verify(token, jwtkey, async(err,payload)=>{
        if(err){
           return res.status(401).send({error:"you must be logged in 2"});
        }
        const {userId} = payload;
        const user = await User.findById(userId);
        req.user = user;
        next();
    })
}