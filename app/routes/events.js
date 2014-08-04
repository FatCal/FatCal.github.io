define(['app/app','moment'],function(App,moment)
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
			beforeModel: function(transition)
			{
				// just authenticate this single event
				query.parse(window.location.href);
				if(query.get("token"))
				{
					return new Ember.RSVP.Promise(function(resolve,reject){		
						DS.ActiveModelAdapter.reopen({
										headers: 
										{
											"Authorization": "Oauth " + query.get("token")
										}
									});				
						debugger;
						var store = App.__container__.lookup("store:main");
						store.find("user","me").then(function(user){
							if(user != null)
							{
								App.me = user;
								resolve();
							}
							else
								reject();
						});
					});
				}
				else 
					this.transitionTo('index');
			},
			model: function(params){
				console.log(params.id);
				return this.store.find('event',params.id);
			}
		});

		App.EventsIndexRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin,{
			// setupController: function(controller){
			// 	console.log("fetching events for");
			// 	console.log(this.modelFor('app').get('calendar'));	
			// 	controller.set('model',this.modelFor('app').get('calendar').get('events'));
			// }
			model: function(){
				var id = this.modelFor('app').get('calendar').get('id');
				return this.store.find('event',{
					calendars: [id], 
					filter_from: moment().subtract('years',1).format(),
					filter_to: moment().add('years',1).format()
				});
			}
		});

		App.EventsNewRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin,{
			controllerName: 'eventsEdit',
			renderTemplate: function(){
				this.render('events/edit');
			},
			setupController: function(controller)
			{
				controller.set('successMessage',null);
				controller.set('isCreating',true);
				var store = this.store;
				var e = store.createRecord('event',{
					publisher: this.modelFor('app').get('calendar'),
					tz: 'Europe/Stockholm',
					event_type: 0
				});
				var i = 0;
				var mod = store.createRecord('module',{name: 'title', moduleData: {}, event: e});
//				e.get('modules').pushObject(mod);
				// e.get('modules').createRecord({name: 'title', moduleData: {}});


				// e.get('modules').then(function(ev){
				// 	ev.get('modules').createRecord({name: name, moduleData: {}});
				// });

				// e.get('modules').pushObjects(['title','description','time','alerts','location'].map(function(name){
				// 	i++;
				// 	//return store.push("module",{id: i,name: name, moduleData: {}});
				// 	return store.createRecord('module',{name: name, moduleData: {}});
				// }));
				// debugger;
				controller.set('model',e);

			}
		});

		App.EventsEditRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin,{
			setupController: function(controller,event)
			{
				controller.set('successMessage',null);
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