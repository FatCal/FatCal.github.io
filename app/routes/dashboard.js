define(['app/app'],function(App){
	App.DashboardRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin,{
		setupController: function(controller){
			console.log("dashboard");
			console.log(controller);
		}
	});
});