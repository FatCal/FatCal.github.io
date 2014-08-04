define
(
	[
		'app/app',
		'ember',
		'ember-data'
	],function(App){
		
		App.Adapter = DS.ActiveModelAdapter.reopen({
				host: 'http://api.joinraft.com',
				namespace: 'api/v1',
				headers: {},
				pathForType: function(type){
					if(type == 'app')
						return 'applications';
					return this._super(type);
				}
				// generateIdForRecord: function() {
				//     var d = new Date().getTime();
				//     var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				//         var r = (d + Math.random()*16)%16 | 0;
				//         d = Math.floor(d/16);
				//         return (c=='x' ? r : (r&0x7|0x8)).toString(16);
				//     });
				//     return uuid;
				// }
			});


		App.Store = DS.Store.extend({
			adapter: App.Adapter
			}); 

		App.ApplicationSerializer = DS.RESTSerializer.extend({
			extractArray: function(store,type,payload)
			{
				var serializer = this;
				return payload.map(function(item){
					console.log(serializer);
					return serializer.extractSingle(store,type,item,item.id);
				});

				// // always wrap the payload
				// var rootType = Ember.String.pluralize(type.toString().split(".")[1]).toLowerCase();
				// p = {};
				// p[rootType] = payload;
				// payload = p;
				// console.log(payload);

				// return this._super(store,type,payload,id,requestType);
			},
	
			extractSingle: function(store,type,payload,id)
			{
				console.log("extracting "+type);
				var inflector = new Ember.Inflector();
				var rootType = (type.toString().split(".")[1]).toLowerCase();
				console.log(payload);
				var model = store.modelFor(type);
				var newPayload = {};
				newPayload[rootType] = payload;
				model.eachRelationship(function(name,meta){
					var relType = (meta.type.toString().split(".")[1]).toLowerCase();
					if(!Ember.none(payload[meta.key]))
					{
						if(meta.kind == 'hasMany')
							relType = Ember.String.pluralize(relType);
						newPayload[relType] = payload[meta.key];
					}	
				});
				var resp = this._super(store,type,newPayload,id);
				console.log("finished extracting "+type);
				return resp;

				// if("event" == rootType)
				// {
				// 	var calendar = payload.publisher;				
				// 	var attendees = payload.attendees;
				// 	var modules = payload.modules;		
				// 	debugger;
				// 	payload = {event: payload, calendar: calendar, attendees: attendees, modules: modules};
				// }
				// else if("user" == rootType)
				// {
				// 	var calendar = payload.calendar;
				// 	payload = {user: payload, calendar: calendar};
				// }
				// else if("calendar" == rootType)
				// {
				// 	var user = payload.user;
				// 	var application = payload.application;
				// 	payload = {calendar: payload} //, user: user, application: application} //, application: application};
				// 	if(user)
				// 		payload['user'] = user;
				// 	if(application)
				// 		payload['app'] = application;
				// }
				// else if("app" == rootType)
				// {
				// //	var users = payload.users;
				// 	var calendar = payload.calendar;
				// 	payload = {app: payload, calendar: calendar}
				// }
				// else if("comment" == rootType)
				// {
				// 	var calendar = payload.calendar;
				// 	var event = payload.event;
				// 	payload = {comment: payload, calendar: calendar, event: event};
				// }
				// else
				// {
				// 	// always wrap the payload
				// 	p = {};
				// 	p[rootType] = payload;
				// 	payload = p;
				// }	

				// var resp = this._super(store,type,payload,id,requestType);
				// console.log("finished extracting "+type);
				// return resp;
			},
			normalize: function(type,prop,hash)
			{
				if("App.Event" == type)
				{
					prop.publisher = prop.publisher.id;
					prop.attendees = prop.attendees.mapProperty("id");
					prop.modules = prop.modules.mapProperty("oid");
//					prop.comments = prop.comments.mapProperty("id");
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
				else if("App.App" == type)
				{
					if(prop.calendar)
						prop.calendar = prop.calendar.id
				}
				else if("App.Comment" == type)
				{


				}
				else if("App.Module" == type)
				{
//					debugger;
					if(prop.event)
					{
						prop.event = prop.event.id;
						// delete any existing module with the same id from the store
// 						var store = this.store;
// 						store.filter('module',function(mod){
// //							debugger;
// 							console.log("included: "+Ember.none(mod.get('id')));
// 							return Ember.none(mod.get('id'));
// 						}).then(function(transientModules){
// 							console.log("looooping");
// 							debugger;
// 							transientModules.forEach(function(mod,index){
// 								debugger;
// 								mod.deleteRecord();
// 							});
// 						})
					}

				}
				return this._super(type,prop,hash);
			},
			normalizeHash: {
				modules: function(hash){
					hash.id = hash.oid;
					hash.moduleData = hash.data;
//					delete hash.oid;
					delete hash.data;
					return hash;
				}
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
			//	debugger;
				var key = relationship.key;
				var belongsToRecord = Ember.get(record,key);
				
				json[key+"_id"] = ""+belongsToRecord.id;
				console.log("serializeBelongsTo");
				console.log(json);
			},
			serializeHasMany: function(record,json,relationship)
			{
		        var key = relationship.key;
		        var hasManyRecords = Ember.get(record, key);
		         
		        // Embed hasMany relationship if records exist
		        if (hasManyRecords && relationship.options.embedded == 'always') {
		            json[key] = [];
		            hasManyRecords.forEach(function(item, index){		            	
		                json[key].push(item.serialize());
		            });
		        }
		        // Fallback to default serialization behavior
		        else {
		            return this._super(record, json, relationship);
		        }
			}
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

