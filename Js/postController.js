app.controller("postctrl", ($scope, mypostfactory, $interval) => {

	// var pr = mypostfactory.callServer2();
	// pr.then(function (data) {
	// 	$scope.result = data;
	// 	console.log("dtaa to check is ", data);
	// 	// newArr.push(data);
	// 	// console.log(newArr[0].data.postprint);

	// 	CrudOperation.newpostList.push(data);
	// 	//	JSON.parse(CrudOperation.newpostList[0].data.postprint[0].data[0].posts.posts);
	// 	console.log(CrudOperation.newpostList);
	// 	dataFromServer(CrudOperation.newpostList);

	// }, function (err) {
	// 	$scope.err = err;
	// 	console.log("postdata is " + err);
	// })

	$interval(function () {
		var pr = mypostfactory.callServer2();
		var newArr = [];
		var chkArr1 = [];
		chkArr1 = CrudOperation.newpostList;
	//	console.log(chkArr1);
		pr.then(function (data) {
			$scope.result = data;
			newArr.push(data);
		//	console.log(newArr);
			// console.log("lenght of updated array ", newArr[0].data.postprint.length);
			//    console.log("lenght of an old array",chkArr1[0].data.postprint.length); 
			if (chkArr1 == "") {
				console.log("to check only")

				CrudOperation.newpostList.push(data);
				//	JSON.parse(CrudOperation.newpostList[0].data.postprint[0].data[0].posts.posts);
				console.log(CrudOperation.newpostList);
				dataFromServer(CrudOperation.newpostList);

			}
			else {
				if (newArr[0].data.postprint.length !==CrudOperation.newpostList[0].data.postprint.length ) {
					//alert("lenght of updated array "+" "+ newArr[0].data.postprint.length);
					//alert("lenght of an old array"+ " " +CrudOperation.newpostList[0].data.postprint.length); 
				//alert("i am inside one step");
				document.getElementById("posts").innerHTML="";
					for (var i =0;i<= newArr[0].data.postprint.length; i++) {
						if (newArr[0].data.postprint[i] !==CrudOperation.newpostList[0].data.postprint[i])
					//alert("inside function");
					{
					    CrudOperation.postlist=[];
	                    // for(i=0;i<CrudOperation.postlist.length;i++){
						// 	CrudOperation.postlist.pop();
						// }
						console.log("length of array ", CrudOperation.postlist.length);
						CrudOperation.id=0;
						CrudOperation.newpostList=[];
						// CrudOperation.newpostList.pop();
						console.log("length of array ",CrudOperation.newpostList.length);
						CrudOperation.newpostList.push(data);
						//	JSON.parse(CrudOperation.newpostList[0].data.postprint[0].data[0].posts.posts);
						console.log(CrudOperation.newpostList);
						dataFromServer(CrudOperation.newpostList);
						return;
					}
				}
				}

			}




		}, function (err) {
			$scope.err = err;
			console.log("postdata is " + err);
		})

	}, 1000)


});
app.factory("mypostfactory", ($http, $q) => {
	return {
		callServer2() {
		//	console.log("server called");
			var url = '/postDataPrint';
			var defered = $q.defer();
			$http.post(url).then(function (data) {
				defered.resolve(data);
			}, function (err) {
				defered.reject(err);
			})
			// 			$interval(function(){
			//              mypostfactory.callServer2();
			//   },10000)
			return defered.promise;
		}

	}
})

