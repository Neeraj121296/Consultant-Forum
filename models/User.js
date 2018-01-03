
class User{
    
        constructor(firstName,lastName,userid, password,bday,gender,phone){
    
            this.userid = userid;
    
            this.password = password;
            this.bday=bday;
            this.firstName=firstName;
            this.lastName=lastName;
            this.gender=gender;
    this.phone=phone;
    
        }
    
    }
    
    module.exports = User;