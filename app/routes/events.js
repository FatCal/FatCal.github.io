define
(
	[
		'app/app'
	],
	function(App)
	{
		console.log("Configuring Event routes");
		App.EventsRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin,{
			
			setupController: function(controller){
				console.log("setting up controller: "+controller);
				controller.set('model',this.store.findAll('event'));
			}
			/*
			model: function()
			{
				return this.store.find('event');
				//return this.get('store').findAll('Event');
			}
			*/

		});

		App.ExternalRoute = Ember.Route.extend({
			// setupController: function(controller,event_id)
			// {
				
			// 	console.log("Ext event");
			// 	console.log(event_id);
			// 	controller.set('model',this.store.find('event',event_id));
			// 	//this.controllerFor('event').set('model',event);
			// }
			model: function(params){
				console.log(params.id);
				return this.store.find('event',params.id);
			}
		});

		App.EventEditRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin,{
			setupController: function(controller,event)
			{
				console.log("editing route");
				controller.set('model',event);
			}
		});

		App.EventRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin,{
			setupController: function(controller,event)
			{
				console.log("event route: "+event.get('title'));
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