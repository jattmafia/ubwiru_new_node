const {Schema,model,mongoose} = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const postSchema = new Schema({
    title:{type:String},
    body:{type: String},
    image:{type: String,},
    postedBy:{type:ObjectId,ref:"user"}
})

const postModel = model("post", postSchema);

module.exports = postModel;
