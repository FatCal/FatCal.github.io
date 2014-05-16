define(['jquery','ember','ember-simple-auth'],function(){
	
	FatCalAuthenticator = Ember.SimpleAuth.Authenticators.Base.extend({ 
		authenticate : function(options){
			return new Ember.RSVP.Promise(function(resolve,reject){
				// authenticate fatcal with facebook token
				var params = {
					'client_id' : '5281248cc0916d1153000001',
					'authentication_type' : 'facebook',
					'facebook_access_token' : options.accessToken	
				}		
				console.log(params);	
				$.post('http://fatcal.datareklam.se/api/v1/oauth/access_token',params)
					.done(function(data){
						console.log("Success: "+data.data.access_token);
						console.log(data);
						controller = App.__container__.lookup("controller:application");
						controller.set('session.access_token',data.data.access_token);
						DS.ActiveModelAdapter.reopen({
							headers: 
							{
								"Authorization": "Oauth " + data.data.access_token
							}
						});		

						var store = App.__container__.lookup("store:main");
						store.find("user","me").then(function(user){
							App.me = user;
							resolve(data);
						});
					})
					.fail(function(error){
						console.log("Error");
						console.log(error);
						reject(error);
					});
			});
		},
		invalidate : function(){
			return new Ember.RSVP.Promise(function(resolve,reject){
				DS.ActiveModelAdapter.reopen({
					headers: 
					{
						"Authorization": " "
					}
				});	
				App.me = null;
				FB.logout();
				resolve();
			});
		}
	});

	FatCalAuthorizer = Ember.SimpleAuth.Authorizers.Base.extend({
		authorize: function(jqXHR, requestOptions){
		var accessToken = this.get('session.access_token');
		console.log("authorizing: "+accessToken);
		if (this.get('session.isAuthenticated') && !Ember.isEmpty(accessToken)) {
			if (!Ember.SimpleAuth.Utils.isSecureUrl(requestOptions.url)) {
				Ember.Logger.warn('Credentials are transmitted via an insecure connection - use HTTPS to keep them secure.');
				}
				jqXHR.setRequestHeader('Authorization', 'Oauth ' + accessToken);
			}
		}
	});
});

