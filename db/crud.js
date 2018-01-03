const userSchema = require("./schema");
var path = require('path');
const url = require('url');
const express=require("express");
var router = express.Router();
//const postSchema=require("./schema/PostSchema");
class PostOperations{

    addPost(postObject,response){
    var mydata=JSON.parse(postObject);
    console.log(mydata.postName);
 userSchema.PostSchema.find({"data.postBy":mydata.postBy,
 "data.postName":mydata.postName},(error,docs)=>{
     
    if(docs.length>=1){
console.log("length is ",docs.length);
        userSchema.PostSchema.deleteMany({"data.postBy":mydata.postBy,"data.postName":mydata.postName},(acknowledged,deletedCount)=>{
            var newData = new   userSchema.PostSchema({data :mydata});
            //  userSchema.PostSchema.save(postObject,function(error){
              
               newData.save(postObject,function(error){
                   
               //    console.log("Inside Add POst ",postObject);
       
                   if(error){
         console.log("Error .... ",error);   
        // response.send("Post Can't Be Added...."); 
                   }
       
                   else {
                       console.log("Post Registered....");
                   } });
                       





        })
        }
    
    else if(docs.length==0){
console.log("length is ",docs.length);
        var newData = new   userSchema.PostSchema({data :mydata});
        //  userSchema.PostSchema.save(postObject,function(error){
          
           newData.save(postObject,function(error){
               
           //    console.log("Inside Add POst ",postObject);
   
               if(error){
     console.log("Error .... ",error);   
    // response.send("Post Can't Be Added...."); 
               }
   
               else{
                   console.log("Post Registered....");
               } });


    }
    else{


        console.log("some db error");
    }
 }
          
     )    }

            


}


            
   
class UserOperations{

    addUser(userObject,response){

       // console.log("Inside Add User ",userObject);

        //console.log("Schema ",userSchema.create);

        userSchema.UserSchema.create(userObject,function(error){

         //   console.log("Inside Add ",userObject);

            if(error){

                console.log("Error .... ",error);   

                response.send("User Can't Be Created...."); 

                   

            }

            else{
               response.send(`User Registered.... <a href="/"> click here to login</a>`);

            }
        });

    }

fetchUser(userObject,response){
//console.log("inside fetch user ",userObject);
userSchema.UserSchema.find({"userid":userObject.userid,"password":userObject.password},(error,docs)=>{

                  if(error){

                      response.send('SOME DB PROBLEM OCCUR');

                  }

                  else

                  if(docs.length==0){
                      
                      response.send('Userid or Password is Invalid');

                  }

                  else

                  if(docs.length>=1){
              //  console.log("docs print",docs[0]);
  console.log("docs print",docs);
            
               
               //  response.render('HomePage',{'uid':docs[0].firstName});
    
              response.sendFile(path.join(__dirname, '../', 'views', 'HomePage.html'));
              
              
    
             }  
         }  )  
  
  
    }

}
module.exports={

   UserOperations: UserOperations,
 PostOperations : PostOperations
}
