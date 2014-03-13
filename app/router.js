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
				console.log("mapping routes");
				this.route("events",{path: "/"});
				this.resource("event", {path: '/event/:event_id'});

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
