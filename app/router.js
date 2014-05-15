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
				this.route("event",{path: '/event/:event_id'});
				this.route("event.edit",{path: 'event/:event_id/edit'});
				this.route("external",{path: 'external/:id'});

				this.route("apps",{path: "/apps"});
				this.resource("app",{path: '/app/:app_id'});

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
