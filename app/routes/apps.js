define(['app/app'],function(App){
	App.AppsRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin,{			
		setupController: function(controller){
			controller.set('model',this.store.findAll('app'));
		}
	});

	App.AppRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin,{
		setupController: function(controller,app){
			controller.set('model',app);
		}
	});
});
