class Comment {

    constructor(commentId, commentValue, commentBy) {

        this.commentId = commentId;
        this.commentValue = commentValue;
        this.commentBy = commentBy;
        this.upCounter = 0;
        this.downCounter = 0;
        this.date = new Date();


    }
    addOldUpCounter(postId, commentId) {
        // console.log("postId is ", postId, "commentId is ", commentId);
        // console.log(CrudOperation.postlist[postId - 1].comments[commentId - 1].upCounter);
        // this.upCounter=CrudOperation.postlist[postId-1].comments[commentId-1].upCounter;
        // this.upCounter++;
        // console.log("counter Up value" + this.upCounter + "and commetn id is " + commentId);


        //  CrudOperation.postlist[postId-1].comments[commentId-1].upCounter=upcount;
        CrudOperation.postlist[postId - 1].comments[commentId - 1].upCounter++;


        var post = new Post();
     //   console.log(post.comments);
        var mypostData = JSON.stringify(CrudOperation.postlist[postId - 1]);
        post.sendData(mypostData);
        return CrudOperation.postlist[postId - 1].comments[commentId - 1].upCounter;
        // return this.upCounter;

    }
    addOldDownCounter(postId, commentId) {


        // CrudOperation.postlist[postId-1].comments[commentId-1].downCounter=downcount;
        CrudOperation.postlist[postId - 1].comments[commentId - 1].downCounter++;


        var post = new Post();
        var mypostData = JSON.stringify(CrudOperation.postlist[postId - 1]);
        post.sendData(mypostData);
        //   return this.downCounter;
        return CrudOperation.postlist[postId - 1].comments[commentId - 1].downCounter;
    }
    addUpCounter(postId, commentId) {
        this.upCounter++;
      //  console.log("counter Up value" + this.upCounter + "and commetn id is " + commentId);


        CrudOperation.postlist[postId - 1].comments[commentId - 1].upCounter++;


        var post = new Post();
      //  console.log(post.comments);
        var mypostData = JSON.stringify(CrudOperation.postlist[postId - 1]);
        post.sendData(mypostData);
        return this.upCounter;

    }
    addDownCounter(postId, commentId) {
        this.downCounter++;
      //  console.log("counter Down value" + this.downCounter);
        var commentObject = new Comment();

        CrudOperation.postlist[postId - 1].comments[commentId - 1].downCounter++;


        var post = new Post();
        var mypostData = JSON.stringify(CrudOperation.postlist[postId - 1]);
        post.sendData(mypostData);
        return this.downCounter;

    }

}
