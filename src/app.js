// console.log("jai shree Ram...");
const express = require('express');
const app =express();
const path = require('path');
let port = 3000;
const empCollection = require('./model/model');
const template_path = path.join(__dirname,'../template/views')

require('./db/db');

app.use(express.urlencoded({extended : false}));

app.set('view engine','hbs');
app.set('views',template_path)


app.get('/',(req,res)=>{
    res.render('index')
})

app.post('/empdata',async(req,res)=>{
  try {
    const password = req.body.password;
    const cpassword = req.body.cpassword;
 
    if(password === cpassword){
     const empData = new empCollection({
         name : req.body.name,
         email : req.body.email,
         phone : req.body.phone,
         password : req.body.password,
         cpassword : req.body.cpassword
     });
     const postData = await empData.save();
     res.send(postData);
    }
    else{
        res.send("passwords are not matching...");
    }
    
  } catch (error) {
    res.send(error)
  }
})

app.listen(port, ()=>{
    console.log(`listening to the port ${port}`);
})