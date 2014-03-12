define
(
	[
		'app/app',
		'ember'
	],
	function(App)
	{
		App.ApplicationRoute = Ember.Route.extend({
		    // admittedly, this should be in IndexRoute and not in the
		    // top level ApplicationRoute; we're in transition... :-)
		    model: function () {
		    	console.log("in app route");
		        return ['red', 'yellow', 'blue'];
		    }
		});		
	}

);
