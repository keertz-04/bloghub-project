const mongoose=require('mongoose');
module.exports=mongoose.model('Blog',new mongoose.Schema({title:String,content:String,author:String}));