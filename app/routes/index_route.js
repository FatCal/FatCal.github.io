define
(
	[
		'app/app',
		'ember'
	],
	function(App)
	{
		App.IndexRoute = Ember.Route.extend
		({
			setupController: function(controller)
			{
				console.log("in index route");
				controller.set('title','FATCAL');
			}
		});
	}
);