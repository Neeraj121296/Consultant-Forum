

class Comment  {
    
        constructor(commentId, commentValue, commentBy,upCounter,downCounter) {
           
            this.commentId=commentId;
            this.commentValue = commentValue;
            this.commentBy = commentBy;
            this.upCounter=upCounter;
            this.downCounter=downCounter;
            this.date = new Date();
    
    
        }
    }
    module.exports = Comment;