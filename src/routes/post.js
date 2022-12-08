const router = require('express').Router();
const express = require('express');
const mongoose = require('mongoose');
const requirelogin = require('../middleware/requirelogin');
const Post = require('../models/post');
const upload = require('../middleware/file_upload');

router.post("/post",requirelogin,upload.single('image'),async function(req,res){
    const{title,body} = req.body;
    const uploadedFile  = req.file;
    let imgurl = null;
    

    if(!title || !body) {
      return  res.status(422).json({status: false, error : "Please fill all fields"});
    }
    // if(!uploadedFile){
    //   const imgurl = "http://localhost:5000/" + uploadedFile.filename;
    // }

    if(uploadedFile){
       imgurl = "http://localhost:5000/" + uploadedFile.filename;
    }

   

    const post = new Post({
        title,
        body,
        image: imgurl,
        postedBy:req.user
    })

   await post.save().then(result=>{
    res.json({post:result})
   }).catch(err=>{
    console.log(err)
   })
});

router.get("/post",requirelogin,async function(req,res){
  Post.find().populate("postedBy","_id fullname")
  .then(posts=>{
    res.json({success:true,data:posts});
  }).catch(err=>{
    console.log(err)
   })
});

router.get("/myposts",requirelogin,async function(req,res){
  Post.find({postedBy:req.user._id}).populate("postedBy","_id fullname")
  .then(posts=>{
    res.json({success:true,data:posts});
  }).catch(err=>{
    console.log(err)
   })
});



module.exports = router;