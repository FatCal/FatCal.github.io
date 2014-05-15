define
(
	[
		'app/app',
		'ember',
		'components/ember-simple-auth/ember-simple-auth'
	],
	function(App)
	{
		App.ApplicationRoute = Ember.Route.extend(Ember.SimpleAuth.ApplicationRouteMixin,{
		    // admittedly, this should be in IndexRoute and not in the
		    // top level ApplicationRoute; we're in transition... :-)
		    model: function () {
		    	console.log("in app route");
		        return ['red', 'yellow', 'blue'];
		    }
		});		
	}

);
