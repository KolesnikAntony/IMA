function fbSDKLoaded() {
	FB.getLoginStatus(function(response) {
		console.log(response);
	});
}

