const router = require('express').Router();
const UserModel = require('../models/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const{JWT_TOKEN} = require('../keys');
const requirelogin = require('../middleware/requirelogin');

router.post("/createaccount", async function(req, res) {
    const userData = req.body;

    const password = userData.password;
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    userData.password = hashpassword;

    const newUser = new UserModel(userData);
    await newUser.save(function(err){
     if(err){
    res.json({success:false,error:err});
    return;
    }

    res.json({success:true,data:newUser});
    });
});


router.post("/login",async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const founduser = await UserModel.findOne({email:email});
    if(!founduser) {
        res.json({success:false, error: "No user found"});
        return;
    }

   const correctPassword = await bcrypt.compare(password,founduser.password);
   if(!correctPassword){
    res.json({success:false, error: "Incorrect password"});
    return;
}

  const token = jwt.sign({_id:founduser._id},JWT_TOKEN);

res.json({success : true, token: token,data: founduser})


});


router.get("/billa",requirelogin,async function(req,res) {
res.json("chal reha");
});


module.exports = router;