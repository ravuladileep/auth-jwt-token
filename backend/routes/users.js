const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/User.model')
const db = 'mongodb+srv://dileep:dileep@autheticatejwt-k2eg1.mongodb.net/jwt-auth?retryWrites=true&w=majority'


mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true},
                (err)=>{
                  if(err){
                    console.log(err)
                  }else{
                    console.log('connected to db...')
                  }
                })

router.post('/register',(req,res)=>{
  let newuserRecord = req.body;
  let user = new UserModel(newuserRecord)
  user.save((err,registereduser)=>{
    if(err){
      res.send({success:false,message:'Error occured while registering user',error:err})
    }else{
      let payload = {userid:registereduser._id};
      let token = jwt.sign(payload,'mysecretkey');

      res.send({
          success:true,
          message: 'registered successfully',
          token : token
      })

    }
  })
})



router.post('/login',(req,res)=>{
  let userData = req.body;
  let findUser = UserModel.findOne({email:userData.email}).lean();
  findUser.exec((err,userDetails)=>{
      if(err){
          res.send({success:false,message:'Error occured While retriving user in backend',error:err});
      }else{
          if(!userDetails){
              res.send({success:false,message:'No User Found'})
          }else if(userData.password!=userDetails.password){
              res.send({success:false,message:'Credential Mismatched'})
          }else{
              delete userDetails.password;
              let payload = {userid : userDetails._id };
              let token = jwt.sign(payload,'mysecretkey');
              res.send({success:true,message:"user found",token:token});
          }
      }
  })
})


router.get('/dashboard',verifyToken,(req,res,next)=>{
  res.status(200).json(decodedToken)
})




function verifyToken (req,res,next) {
  if(!req.header.authorization){
    return res.status(401).send('unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  jwt.verify(token,'mysecretkey',(err,decode)=>{
    if(err){
      return res.status(401).send('unauthorized request')
    }else{
      decodedToken = decode
      next();
    }
  })
}




module.exports = router
