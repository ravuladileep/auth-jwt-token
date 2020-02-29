const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const app = express()
const routes = require('./routes/users')


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(cors())
app.use('/users',routes)

app.listen(3000,(err)=>{
  if(err){
    console.log('Error occured while listening the port')
    console.log(err)
  }else{
    console.log('server running on port 3000')
  }
})


