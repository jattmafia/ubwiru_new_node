const {Schema, model} =  require('mongoose');

const userSchema = new Schema({
    firstname: {type: String},
    lastname: {type: String},
    gender: {type: String},
    lookingfor: {type:String},
    email: { type: String, unique:true},
    password:{type:String},
    phone:{type:String,unique:true},
    addedon:{type: Date, default:Date.now},
    dob:{type:String}
});

const userModel = model("user", userSchema);

module.exports = userModel;

