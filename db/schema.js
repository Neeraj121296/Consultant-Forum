//import { json } from "body-parser";


const mongoose = require("./connection");

var Schema = mongoose.Schema;

var userSchema = new Schema({firstName:String,lastName:String,userid:String,password:String,bday:String,gender:String,phone:String});

var UserSchema = mongoose.model("usermasters",userSchema);

console.log("Schema is Created ",UserSchema);

var postSchema=new Schema({
  data:Array,
 
});

var PostSchema=mongoose.model("postMasters",postSchema);
console.log("post schema is created ",PostSchema);






module.exports={
    
      UserSchema:UserSchema,
      PostSchema:PostSchema
    }
  