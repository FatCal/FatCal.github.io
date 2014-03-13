define('app/app',
	[
		'handlebars',
		'emblem',
		'ember',
		'ember-data',
		'pickadate',
		'pickadate-date',
		'pickadate-time',
		'query',
//		'ember-simple-auth'
	],function(){

		// var QueryParamAuthenticator = Ember.SimpleAuth.Authenticators.OAuth2.extend({
		// 	authenticate: function(credentials)
		// 	{
		// 		console.log("AUTHENTICATING!");
		// 		var _this = this;
		// 		return new Ember.RSVP.Promise(function(resolve,reject){
					
		// 			if(credentials.access_token)
		// 			{
		// 				result = {
		// 					"access_token" : credentials.access_token,
		// 					"token_type" : "bearer"
		// 				}
		// 				resolve(result);
		// 			}
		// 			else
		// 				reject("No access token provided in credentials");

		// 		});
		// 	}
		// });

		console.log("app/app");
		var App = window.App = Ember.Application.create({
			VERSION: '1.0',
			rootElement: '#ember',
			ready: function()
			{
				this.set("Router.enableLogging",true)
			}
		});

//		App.ApplicationRoute = Ember.Route.extend(Ember.SimpleAuth.ApplicationRouteMixin);

		// App.initializer({
		//   name: 'authentication',
		//   initialize: function(container, application) {
		//   	container.register("app:authenticators:queryParam",QueryParamAuthenticator)
		//     Ember.SimpleAuth.setup(container, application);
		//   }
		// });

		App.initializer({
			name: "loadCurrentUser",
//			after: "authentication",
			initialize: function(container,application) {
				App.deferReadiness();
				console.log("App");
				query.parse(window.location.href);
				store = container.lookup("store:main");

				if(query.get("token"))
				{
					DS.ActiveModelAdapter.reopen({
									headers: 
									{
										"Authorization": "Oauth " + query.get("token")
									}
								});					
				}

				store.find("user","me").then(function(user){
					App.me = user;
					App.advanceReadiness();
				});
			}

		 })



		return App;
	}
);
