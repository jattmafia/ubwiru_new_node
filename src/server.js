const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3030;


app.use(express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect("mongodb+srv://ubwiru:gUjhe1uC7ZnaKuIB@cluster0.c1roijk.mongodb.net/Ubwiru?retryWrites=true&w=majority"
).then(function(){
     app.listen(PORT, function() {
    {}
    console.log(`App started at : ${PORT}`);
 });
    
    
    app.get("/", function(req,res){
   res.send("Ubwiru setup");
   });

   const authRoutes = require('./routes/auth');
   const postRoutes = require('./routes/post');
   app.use("/api/user", authRoutes);
   app.use("/api/user", postRoutes);
   
  });







