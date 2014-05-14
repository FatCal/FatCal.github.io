define(['app/app','facebook'],function(){
	App.ApplicationController = Ember.Controller.extend({
		actions: {
			login: function(){
				FB.login();
			},
			logout: function(){
				FB.logout();
			}
		}
	});
});