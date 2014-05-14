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
		'ember-simple-auth',
		'fatcal-auth'
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

		App.initializer({
		  name: 'authentication',
		  initialize: function(container, application) {
			// setup simple auth
			container.register('authenticator:fatcal',FatCalAuthenticator);
			Ember.SimpleAuth.setup(container,application,{
				storeFactory: 'ember-simple-auth-session-store:local-storage',
				authenticationRoute: 'index',
				routeAfterAuthentication: 'dashboard'
//				authorizerFactory: 'ember-simple-auth-authorizer:oauth2-'
			});
		  }
		});

		App.initializer({
			name: "loadCurrentUser",
//			after: "authentication",
			initialize: function(container,application) {
				console.log("App.initialize");

				// check for tokens (FIXME: replace this)
				query.parse(window.location.href);
				store = container.lookup("store:main");

				if(query.get("token"))
				{
					App.deferReadiness();
					DS.ActiveModelAdapter.reopen({
									headers: 
									{
										"Authorization": "Oauth " + query.get("token")
									}
								});					
		
					store.find("user","me").then(function(user){
						App.me = user;
						App.advanceReadiness();
					});
				}
			}

		 })



		return App;
	}
);
