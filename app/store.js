define
(
	[
		'app/app',
		'ember',
		'ember-data'
	],function(App){
		
		App.Adapter = DS.ActiveModelAdapter.reopen({
				host: 'http://fatcal.datareklam.se',
				namespace: 'api/v1',
				headers: {},
				pathForType: function(type){
					if(type == 'apps')
						return 'applications';
					return this._super(type);
				}
			});

		App.Store = DS.Store.extend({
			adapter: App.Adapter
			}); 

		App.ApplicationSerializer = DS.RESTSerializer.extend({
			extractArray: function(store,type,payload,id,requestType)
			{
				// always wrap the payload
				var rootType = Ember.String.pluralize(type.toString().split(".")[1]).toLowerCase();
				p = {};
				p[rootType] = payload;
				payload = p;
				console.log(payload);

				return this._super(store,type,payload,id,requestType);
			},
	
			extractSingle: function(store,type,payload,id,requestType)
			{
				console.log(payload);


				var rootType = (type.toString().split(".")[1]).toLowerCase();
				if("event" == rootType)
				{
					var calendar = payload.publisher;				
					var attendees = payload.attendees;				

					payload = {event: payload, calendar: calendar, attendees: attendees};
				}
				else if("user" == rootType)
				{
					var calendar = payload.calendar;
					payload = {user: payload, calendar: calendar};
				}
				else if("calendar" == rootType)
				{
					var user = payload.user;
					var application = payload.application;
					payload = {calendar: payload, user: user} //, application: application};
				}
				else if("application" == rootType)
				{
				//	var users = payload.users;
					var calendar = payload.calendar
					payload = {application: payload, calendar: calendar}
				}
				else
				{
					// always wrap the payload
					p = {};
					p[rootType] = payload;
					payload = p;
				}	

				var resp = this._super(store,type,payload,id,requestType);

				return resp;
			},
			normalize: function(type,prop,hash)
			{

				if("App.Event" == type)
				{
					prop.publisher = prop.publisher.id;
					prop.attendees = prop.attendees.mapProperty("id");
				}
				else if("App.Attendee" == type)
				{
					prop.event = prop.event.id;
					prop.calendar = prop.calendar.id;
				}
				else if("App.User" == type)
				{
					prop.calendar = prop.calendar.id;
				}
				else if("App.Calendar" == type)
				{
					if(prop.user)
						prop.user = prop.user.id;
					if(prop.application)
						prop.application = prop.application.id;
				}
				else if("App.Application" == type)
				{
					if(prop.calendar)
						prop.calendar = prop.calendar.id
				}
				return this._super(type,prop,hash);
			},
			serialize: function(record,options)
			{
				return this._super(record,options);
			},
			serializeIntoHash: function(data,type,record,options)
			{
				// remove root node
				Ember.merge(data,this.serialize(record,options));
				//return this._super(data,type,record,options);
			},
			serializeBelongsTo: function(record,json,relationship)
			{
				var key = relationship.key;
				var belongsToRecord = Ember.get(record,key);
				
				json[key+"_id"] = ""+belongsToRecord.id;
				console.log("serializeBelongsTo");
				console.log(json);
			}
			// serializeHasMany: function(record,json,relationship)
			// {
			// 	var key = relationship.key;
			// 	var hasManyRecords = Ember.get(record,key);
			// 	if(hasManyRecords)
			// 		json[key] = []

			// }
			/*,
			typeForRoot: function(root)
			{
				console.log("typeForRoot");
				console.log(root);
				return this._super(root);
			}
			*/
		});


	}
);

