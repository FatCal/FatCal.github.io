define(['app/app'],function(App){
	App.ApplicationsRoute = Ember.Route.extend
	({			
		setupController: function(controller){
			controller.set('model',this.store.findAll('application'));
		}
	});
});
