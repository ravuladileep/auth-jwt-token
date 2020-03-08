const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const app = express()
const routes = require('./routes/users')
const dotenv = require('dotenv').config()

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(cors())
app.use('/users',routes)

app.listen(process.env.PORT,(err)=>{
  if(err){
    console.log('Error occured while listening the port')
    console.log(err)
  }else{
    console.log('server running on port'+process.env.PORT)
  }
})


