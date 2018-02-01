const express = require('express');
const path    = require('path');
const body_parser = require('body-parser');
const mongoose = require("mongoose");
const router = require('express').Router();
const PORT  = process.env.PORT  || 8080;
const app = express();
const userInfoCol = require('./models/infoDB');


app.use(body_parser.urlencoded({extended :false}));
app.use(body_parser.json());
app.use(express.static('client/build'));


//-----------------------------------------Routes--------------------------------------------
app.post('/data',(req,res)=>{

userInfoCol.create({name: req.body.name,
             info: req.body.data},(err)=>{if(err){console.log(err)} 
              else {res.sendStatus(200)}});

    
    
});


app.get('/getData',(req,res)=> {
    userInfoCol.find({}).then((infoData) =>{res.send(infoData)}).catch(err => console.log(err));
 
});


app.delete('/delData/:id',(req,res)=>{
    let id = req.params.id;
    userInfoCol.findByIdAndRemove({ _id: id },(err)=>{if(err){console.log(err)}else{res.sendStatus(200)}});
});


app.put('/upData/:id',(req,res)=>{
    let id = req.params.id;
    if(req.body.name){
        userInfoCol.findByIdAndUpdate({_id:id}, {name : req.body.name},(err)=>{if(err){console.log(err)}else{res.sendStatus(200)}})
    }
    else if( req.body.data){
        userInfoCol.findByIdAndUpdate({_id:id},{info : req.body.data},(err)=>{if(err){console.log(err)}else{res.sendStatus(200)}})
    }
});
//-----------------------------------------Routes--------------------------------------------
mongoose.Promise = global.Promise;

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/dataInfoTestDB"

);





app.listen(PORT,()=>{
    console.log(`Its working on port ${PORT}`);
})