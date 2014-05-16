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
		'fatcal-auth',
		'token-auth'
	],function(){
		Ember.onLoad('application', Emblem.compileScriptTags);
		
		console.log("app/app");
		var App = window.App = Ember.Application.create({
			VERSION: '1.0',
			rootElement: '#ember',
			ready: function()
			{
				this.set("Router.enableLogging",true)
			}
		});

		App.initializer({
		  name: 'authentication',
		  initialize: function(container, application) {
			// setup simple auth
			console.log("auth init");
			container.register('authenticator:fatcal',FatCalAuthenticator);
			container.register('authenticator:token',TokenAuthenticator);
			container.register('authorizer:fatcal',FatCalAuthorizer);
			Ember.SimpleAuth.setup(container,application,{
				storeFactory: 'ember-simple-auth-session-store:local-storage',
				authenticationRoute: 'index',
				routeAfterAuthentication: 'dashboard',
				authorizerFactory: 'authorizer:fatcal'
			});
		  }
		});

		App.initializer({
			name: "loadCurrentUser",
			after: "authentication",
			initialize: function(container,application) {
				console.log("App.initialize");

				// check for tokens (FIXME: replace this)
				query.parse(window.location.href);
				store = container.lookup("store:main");

				if(query.get("token"))
				{	
					var token = query.get("token")
					App.deferReadiness();
					var controller = App.__container__.lookup('controller:application');
					controller.get('session').authenticate('authenticator:token',token);

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


		 });

		return App;
	}
);
