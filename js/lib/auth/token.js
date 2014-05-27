define(['app/app','ember','ember-simple-auth'],function(App){

	TokenAuthenticator = Ember.SimpleAuth.Authenticators.Base.extend({
		authenticate: function(options){
			debugger;
			return new Ember.RSVP.Promise(function(resolve,reject){
				//console.log("authenticating with token: "+options);
				DS.ActiveModelAdapter.reopen({
								headers: 
								{
									"Authorization": "Oauth " + options
								}
							});				
				debugger;
				var store = App.__container__.lookup("store:main");
				store.find("user","me").then(function(user){
					if(user != null)
					{
						App.me = user;
						resolve();
					}
					else
						reject();
				});
			});
		},
		invalidate: function(){
			return new Ember.RSVP.Promise(function(resolve,reject){
				resolve(true);
			});
		},
		restore: function(){
			debugger;
		}
	});
});