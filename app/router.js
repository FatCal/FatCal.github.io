define
(
	[
		'app/app'
	],
	function(App)
	{
		console.log("Router")


		App.Router.reopen({
			rootURL: '/'
		});

		App.Router.map
		(
			function () 
			{
				this.route("events",{path: "/events"});
				this.resource("event", {path: '/event/:event_id'});

				this.route("applications",{path: "/apps"});

				this.route("dashboard",{path: "/dashboard"});

				/*
				this.resource("users",function(){

				});

				this.resource("calendar", {path: '/calendar/:calendar_id'});
				this.resource("user", {path: '/user/:user_id'});
				this.resource("attendee",{path: '/attendee/:attendee_id'});
				this.resource("attendees",{path: '/attendees/'});
				*/
			}
		);
	}
);
