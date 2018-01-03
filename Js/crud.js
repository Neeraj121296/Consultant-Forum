const CrudOperation = {
    postlist: [],
newpostList:[],
    id: 0,
    
    
  
    addPost(post, img, postBy,date) {
        this.id++;
        var postObject = new Post(this.id, post, img, postBy,date);
    
        this.postlist.push(postObject);
        var mypostData=JSON.stringify(CrudOperation.postlist[CrudOperation.postlist.length-1]);
     
   postObject.sendData(mypostData);
    },
  
addOldPost(id,post,img,postBy,postDate){
   this.id++;
    // this.id=id;
    var postObject = new Post(this.id, post, img, postBy,postDate);

    this.postlist.push(postObject);

},



    updatePost() {

    },
    searchPost(postId) {
        //	var subArray = this.postList.filter(function(obj){
        //			return obj.id ==postId;
        //		});
        //		return subArray;
    },
    updateComment(postId) {
        /*var arr = this.searchPost(postId);
        var obj = arr[0];
        var likeCount = obj.incrementLike();
        return likeCount;*/
              //console.log(commentValue);
        	//return this.searchPost(postId)[0].addComment(commentValue,commentBy);
    },
    deletePost() {},
    sortById() {},
  // fetchComment(commentValue, commentBy) {
//
  //      var commentObject = new Comment(this.commentId, commentValue, commentBy);
    //    var post=new Post();
       
      // post.addComment(commentObject);
      //  this.commentId++;
        


    //}
}
