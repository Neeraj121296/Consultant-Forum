app.controller("loginctrl",($rootScope,myfactory)=>{
    var pr = myfactory.callServer();
    
	pr.then(function(data){
        $rootScope.result = data;
        // console.log(data);
	},function(err){
        $scope.err = err;
        // console.log("data is "+ err);
	})
});


app.factory("myfactory",($http,$q)=>{
	return{
		callServer(){
        //     console.log("server called");
			var url = '/data';
			var defered = $q.defer();
			$http.post(url).then(function(data){
				defered.resolve(data);
			},function(err){
				defered.reject(err);
			})
			return defered.promise;
		}
		
	}
})



    
    