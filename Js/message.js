window.addEventListener("load", bindEvents);
var checkVal = 0;
var countrChk = 0;
var postFromServerArr = [];

myBlurFunction = function (state) {
    /* state can be 1 or 0 */
    var containerElement = document.getElementById('main_container');
    var overlayEle = document.getElementById('overlay');

    if (state) {
        overlayEle.style.display = 'block';
        //containerElement.setAttribute('class', 'blur');
    } else {
        overlayEle.style.display = 'none';
        //containerElement.setAttribute('class', null);
    }
};
var primaryId = 0;

function bindEvents() {
    document.getElementById("popup").addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) {

            doPost();
            myBlurFunction();
        }

    });

    document.getElementById("popupBtn").addEventListener("click", doPost);
    //setTimeout(document.location.reload(true), 10000);
    /**setTimeout(function(){
        location.reload();
    },10000);*/
}

function dataFromServer(Postarr) {
    // console.log(Postarr);
    //   console.log(  JSON.parse(Postarr[0].data.postprint[0].data[0].posts.posts));
postFromServerArr=[];
    for (i = Postarr[0].data.postprint.length - 1; i >= 0; i--) {
        // console.log(Postarr[0].data.postprint.length);
        postFromServerArr.push(Postarr[0].data.postprint[i].data[0]);
    }
    // console.log(postFromServerArr);
    for (i = 0; i <= postFromServerArr.length - 1; i++) {
        // $(document).ready(function () {
        //     console.log("inside refresh function");
        //     $("#popupBtn").click(function () {
        //         $("#posts").load("HomePage.html");

        //         return false;
        //     });
        // });
        var id = postFromServerArr[i].id;
        var img = postFromServerArr[i].img;
        var postBy = postFromServerArr[i].postBy;
        var postName = postFromServerArr[i].postName;
        var postDate = postFromServerArr[i].postDate;
        if (postFromServerArr[i].comments.length >= 1) {

            checkVal++;
        }

        CrudOperation.addOldPost(id, postName, img, postBy, postDate);
        var lastAdded = CrudOperation.postlist[CrudOperation.postlist.length - 1];
        // console.log(lastAdded);
        printRecord(lastAdded);
        countrChk++;
    }

    checkVal = 0;
    countrChk = 0;

}

function doPost(event) {
    var date = new Date();
    var img = document.getElementById("popupTxt").value;
    var post = document.getElementById("popup").value;
    var trimPost = post.trim();
    var postBy = document.getElementById("postById").innerHTML;
    if (trimPost == "") {

        alert("Ask Your Question ");
    } else {

        CrudOperation.addPost(trimPost, img, postBy, date);
        var lastAdded = CrudOperation.postlist[CrudOperation.postlist.length - 1];
        // console.log(lastAdded);
        printRecord(lastAdded);

        document.getElementById("popupTxt").value = "";
        document.getElementById("popup").value = "";
        document.getElementById("post").value = "";
    }

}
var cell;

function printRecord(postObject) {
    var post = new Post(CrudOperation.id);
    // console.log("postObject is " + post.id);

    var space = document.createElement("div");
    var cell = document.createElement("div");
    if (postObject.img == "") {
        cell.innerHTML = "<b>" + postObject.postBy + "</b>" + "&nbsp;" + "asked" + "&nbsp;&nbsp;" + "<small>" + "<small>" + postObject.postDate + "</small>" + "</small>" + "</br>" + "<b>" + postObject.postName + "</b>" + "<br>" + "<img src='" + "</br>";
    } else {
        cell.innerHTML = "<b>" + postObject.postBy + "</b>" + "&nbsp;" + "asked" + "&nbsp;&nbsp;" + "<small>" + "<small>" + postObject.postDate + "</small>" + "</small>" + "</br>" + "<b>" + postObject.postName + "</b>" + "<br>" + "<img src='" + postObject.img + "'>" + "</br>";
        //tbody.appendChild(cell);
    }
    space.innerHTML = "</br>";
    space.className = "spaceClass";
    var list = document.getElementById("posts");

    list.insertBefore(cell, list.childNodes[0]);
    list.insertBefore(space, list.childNodes[0]);
    var uniId = CrudOperation.id;
    showComment = document.createElement("BUTTON");

    showComment.className = "commentButton";
    showComment.id = "answerId" + uniId;
    showComment.innerHTML = "answer";
    cell.appendChild(showComment);

    var garbageElement = document.createElement("span");
    garbageElement.innerHTML = "</br>";
    garbageElement.id = "element" + uniId;
    cell.appendChild(garbageElement);

    defaultElement = document.createElement("span");
    defaultElement.innerHTML = "";
    defaultElement.id = "spanELement" + uniId;
    cell.appendChild(defaultElement);
    if (checkVal > 0) {
        // console.log("i am one function in");
        showCommentBox(showComment.id, "element" + uniId, "spanELement" + uniId, post);
        document.getElementById("answerId" + uniId).disabled = true;
        // console.log("postObject" + post);
    }
    document.getElementById("answerId" + uniId).onclick = function () {
        showCommentBox(showComment.id, "element" + uniId, "spanELement" + uniId, post);
        document.getElementById("answerId" + uniId).disabled = true;
        // console.log("postObject" + post);
    };
}

function showCommentBox(showCommentId, spanId, defaultId, post) {
    var uniId = primaryId;
    primaryId++;

    Commentarea = document.createElement("textarea");
    Commentarea.className = "textAreaProp";
    
    Commentarea.id = "addButtonId" + uniId;
    var myId= "addButtonId" + uniId;
  
   Commentarea.placeholder= "Type Your Answer Here..And Press Enter";
    document.getElementById(spanId).appendChild(Commentarea);
    if (checkVal > 0) {
        // console.log("i am two function in");
        doOldComment(defaultId, "addButtonId" + uniId, post);

    }
    Commentarea.addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) {

            doComment(defaultId, "addButtonId" + uniId, post);

        }
    });

}
var upvote;
var downvote;

function doOldComment(spanId, commentAreaId, post) {
    // var upcounter=0;
    // var downcounter=0;

    // console.log("lenght of comment", postFromServerArr[0].comments.length - 1);
    // console.log("in comment value", postFromServerArr[0].comments[0]);
    // for(i=0;i<=postFromServerArr.length-1;i++){
    var commentObj = new Comment();
    // console.log("post from server in func", postFromServerArr[i].comments.length - 1);
    for (j = 0; j <= postFromServerArr[countrChk].comments.length - 1; j++) {
      
        var commentId = postFromServerArr[countrChk].comments[j].commentId;
        var commentBy = postFromServerArr[countrChk].comments[j].commentBy;
        var commentValue = postFromServerArr[countrChk].comments[j].commentValue;
        var date = postFromServerArr[countrChk].comments[j].date;
        var upCounter = postFromServerArr[countrChk].comments[j].upCounter;
        var downCounter = postFromServerArr[countrChk].comments[j].downCounter;
        var trimcommentValue = commentValue.trim();
        // console.log("value is " + trimcommentValue);
        post.addOldComment(commentId, trimcommentValue, commentBy, post.id);
        upvote = document.createElement("a");
        upvote.className = "voteProp";
        upvote.innerHTML = "&nbsp;&nbsp;&nbsp;"+"upvote" + "&nbsp;&nbsp;" + upCounter;
        upvote.id = "upvoteId" + "-" + post.id + "-" + commentId;
        CrudOperation.postlist[post.id - 1].comments[commentId - 1].upCounter = upCounter;
        upvote.addEventListener("click", upvotePlus, false);
        downvote = document.createElement("a");
        downvote.className = "voteProp";
        downvote.id = "downvoteId" + "-" + post.id + "-" + commentId;
        CrudOperation.postlist[post.id - 1].comments[commentId - 1].downCounter = downCounter;
        downvote.innerHTML = "downvote" + "&nbsp;&nbsp;" + downCounter;
        downvote.addEventListener("click", downvotePlus, false);


        var lastAddedComment = post.comments[post.comments.length - 1];
        var finalPost = CrudOperation.postlist[CrudOperation.postlist.length - 1];
        // console.log(lastAddedComment);
        // console.log(finalPost);
        commentRecord(lastAddedComment, spanId);
        document.getElementById(commentAreaId).value = "";
    }

}

function upvotePlus() {
    // alert("test"+document.getElementById(this.id));
    // alert(" test"+document.getElementById(this.id).innerHTML.split("&nbsp;nbsp;")[1]);
    // alert("Bhuwan:test "+this.id + " comment id ="+this.id.split("-")[2]);
    var commentObj = new Comment();
    var postId = this.id.split("-")[1];
    var commentId = this.id.split("-")[2];
    var upcount = commentObj.addOldUpCounter(postId, commentId);
    document.getElementById(this.id).innerHTML = "upvote" + "&nbsp;&nbsp;" + upcount;
}

function downvotePlus() {

    var commentObj = new Comment();
    var postId = this.id.split("-")[1];
    var commentId = this.id.split("-")[2];
    var downcount = commentObj.addOldDownCounter(postId, commentId);
    document.getElementById(this.id).innerHTML = "downvote" + "&nbsp;&nbsp;" + downcount;


}
// upvote.onclick = function (event, commentId) {
//     console.log("event id is ", event.currentTarget.id);
//     console.log("Post id is " + post.id + " & commentId is" + " commentId is " + commentId);
//     var upcount = commentObj.addOldUpCounter(post.id, commentId, upCounter);
//     console.log("likes are" + upcount);
//     upCounter = upcount;
//     document.getElementById(event.currentTarget.id).innerHTML = "upvote" + "&nbsp;&nbsp;" + upCounter;
//     // document.getElementById("upvoteId"+post.id+commentObj.commentId).innerHTML="upvote"+"&nbsp;&nbsp;"+upCounter;
// };

// downvote.onclick = function (event, commentId) {
//     console.log("event id is ", event.currentTarget.id);
//     console.log("Post id is " + post.id + " & commentId is" + " commentId is " + commentId);
//     var downcount = commentObj.addOldDownCounter(post.id, commentObj.commentId, downCounter);

//     downCounter = downcount;
//     document.getElementById(event.currentTarget.id).innerHTML = "downvote" + "&nbsp;&nbsp;" + downCounter;
//     // document.getElementById("downvoteId"+post.id+commentObj.commentId).innerHTML="downvote"+"&nbsp;&nbsp;"+downCounter;
// };





function doComment(spanId, commentAreaId, post) {
    var upcounter = 0;
    var downcounter = 0;


    // console.log("value"+upcounter);
    var postBy = document.getElementById("postById").innerHTML;
    var commentValue = document.getElementById(commentAreaId).value;
    var trimcommentValue = commentValue.trim();
  //  console.log("value is " + trimcommentValue);

    ///console.log("after function call post id is "+post.id);
    post.addComment(trimcommentValue, postBy, post.id);

    var commentObj = new Comment(post.commentId);

    upvote = document.createElement("a");
    upvote.className = "voteProp";
    upvote.id = "upvoteId" + post.id + commentObj.commentId;
    downvote = document.createElement("a");
    downvote.className = "voteProp";
    downvote.id = "downvoteId" + post.id + commentObj.commentId;
    upvote.innerHTML ="&nbsp;&nbsp;&nbsp;" + "upvote" + "&nbsp;&nbsp;" + upcounter;
    downvote.innerHTML = "downvote" + "&nbsp;&nbsp;" + downcounter;
    var lastAddedComment = post.comments[post.comments.length - 1];
    var finalPost = CrudOperation.postlist[CrudOperation.postlist.length - 1];
    // console.log(lastAddedComment);
    // console.log(finalPost);
    commentRecord(lastAddedComment, spanId);
    document.getElementById(commentAreaId).value = "";

    upvote.onclick = function () {

        var upcount = commentObj.addUpCounter(post.id, commentObj.commentId);
       // console.log("likes are" + upcount);
        upcounter = upcount;
        document.getElementById("upvoteId" + post.id + commentObj.commentId).innerHTML = "&nbsp;&nbsp;" +"upvote" + "&nbsp;&nbsp;" + upcounter;
    };

    downvote.onclick = function () {

        var downcount = commentObj.addDownCounter(post.id, commentObj.commentId);
        downcounter = downcount;
        document.getElementById("downvoteId" + post.id + commentObj.commentId).innerHTML = "downvote" + "&nbsp;&nbsp;" + downcounter;
    };


}

var CommentArea;

function commentRecord(commentObject, spanId) {
    space = document.createElement("span");

    space.innerHTML = "&nbsp;&nbsp&nbsp;&nbsp"
    var finalComment = document.createElement('div');
    finalComment.innerHTML ="&nbsp;&nbsp;" +"<b>" + commentObject.commentBy + "</b>" + "&nbsp;" + "answered" + "&nbsp;&nbsp;" + "<small>" + "<small>" +
        commentObject.date + "</small>" + "</small>" + "<br>" +"&nbsp;&nbsp;&nbsp;" + "<b>" + commentObject.commentValue + "</b>" +
        "<br>";
    CommentArea = document.getElementById(spanId);


    CommentArea.appendChild(finalComment);
    CommentArea.appendChild(upvote);
    CommentArea.appendChild(space);
    CommentArea.appendChild(downvote);

}
