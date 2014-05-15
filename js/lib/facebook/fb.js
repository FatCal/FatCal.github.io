define(['facebook','ember'], function(){
  FB.init({
    appId      : '406893086091235'
  });
  FB.getLoginStatus(function(response) {
    //console.log(response);
  });

  FB.Event.subscribe('auth.statusChange',function(response){
  	console.log("auth_status_change_callback: " + response.status);
 	// fetch the indexController (any controller would do)
  	var indexController = App.__container__.lookup('controller:index');
  	console.log(indexController);
  	if(response.status == 'connected')
	  	indexController.get('session').authenticate('authenticator:fatcal',response.authResponse);
	else
		indexController.get('session').invalidate();
  });
});