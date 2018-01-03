
class Post {

    constructor(id, postName, img, postBy, postDate) {
        this.commentId = 0;
        this.id = id;
        this.postName = postName;
        this.img = img;
        this.postBy = postBy;
        this.postDate = postDate;
        this.comments = [];
    }
    addOldComment(cmntId, commentValue, commentBy, postId) {
        this.commentId = cmntId;
        var commentObject = new Comment(cmntId, commentValue, commentBy);
      //  console.log("id is " + this.commentId);
        this.comments.push(commentObject);
        // console.log("now to check id ", postId);
        CrudOperation.postlist[postId - 1].comments.push(commentObject);
        // console.log("aftr comment updated postlist will be" + CrudOperation.postlist);
    }
    addComment(commentValue, commentBy, postId) {
        this.commentId++;
        var commentObject = new Comment(this.commentId, commentValue, commentBy);
        // console.log("id is " + this.commentId);
        this.comments.push(commentObject);
        CrudOperation.postlist[postId - 1].comments.push(commentObject);
        // console.log("aftr comment updated postlist will be" + CrudOperation.postlist);
        var mypostData = JSON.stringify(CrudOperation.postlist[postId - 1]);
        this.sendData(mypostData);
    }

    sendData(mypostData) {
        // console.log("inside send data" + mypostData);
        $.ajax({

            type: 'POST',
            url: '/postdata',
            data: { posts: mypostData },
            dataType: 'json',
            success: function (data) {
                // console.log("data send succesfully");
            }
        });

    }
}
