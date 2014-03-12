define
(
	[
		'app/app',
		'ember',
		'ember-data'
	],
	function(App)
	{
		console.log("Events");
		App.EventsRoute = Ember.Route.extend
		({
			/*
			setupController: function(controller){
				console.log("setting up controller: "+controller);
//				controller.set('model',events.findAll('event'));
			},
			*/
			model: function()
			{
				return this.store.find('event');
				//return this.get('store').findAll('Event');
			}

		});

		App.EventRoute = Ember.Route.extend
		({
			setupController: function(controller,event)
			{
				console.log("event: "+event.get('title'));
				controller.set('model',event);
			}
			/*,
			model: function(params)
			{
				console.log(params);
				var id = params.event_id;
				console.log("in event route: "+id);
				return this.get('store').find('event',params.event_id);
			}
			*/
		});

		App.CalendarRoute = Ember.Route.extend
		({
			model: function(params){
				console.log("CalendarRoute");
				return this.get('store').find('calendar',params.calendar_id)
			}
		});

		App.UserRoute = Ember.Route.extend
		({
			model: function(params)
			{
				console.log("UserRoute");
				return this.get('store').find('user',params.user_id);
			}
		});

		App.AttendeeRoute = Ember.Route.extend
		({
			model: function(params)
			{
				console.log("AttendeeRoute");
				return this.get('store').find('attendee',params.attendee_id);
			}
		})

		App.AttendeesRoute = Ember.Route.extend
		({
			model: function(params)
			{
				console.log("AttendeesRoute");
				return this.get('store').findAll('attendee');
			}
		})
	}
);