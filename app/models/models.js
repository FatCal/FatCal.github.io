define
(
	[
		'app/app',
		'ember',
		'ember-data'
	],
	function(App)
	{
		App.Event = DS.Model.extend({
			publisher: DS.belongsTo('calendar'),
			attendees: DS.hasMany('attendee',{async: true}),

			title: DS.attr("string"),
			description: DS.attr("string"),
			start_date: DS.attr("date"),
			start_time: DS.attr("date"),
			end_date: DS.attr("date"),
			end_time: DS.attr("date"),
			filter_time: DS.attr("date")

//			modules: DS.hasMany('module')
		});

		App.Calendar = DS.Model.extend({
			user: DS.belongsTo("user")
			//application: DS.belongsTo("application")
		});

		App.User = DS.Model.extend({
			calendar: DS.belongsTo("calendar"),
			firstname: DS.attr(),
			lastname: DS.attr(),
			email: DS.attr(),
			avatar : DS.attr(),

			displayName: function(){
				if(App.me.id == this.id)
					return "You";
				else
					return this.get('firstname') + ' ' + this.get('lastname');

			}.property('firstname','lastname'),
			avatarURL: function(){
				return 'http://fatcal.datareklam.se/uploads/'+this.get('avatar');
			}.property('avatar')
		});

		App.Attendee = DS.Model.extend({
			calendar: DS.belongsTo("calendar"),
			event: DS.belongsTo("event"),
			status: DS.attr(),
			
			hrStatus: function(){
				switch(this.get('status'))
				{
					case 0: return "Unauthorized";
					case 1: return "Invited";
					case 2: return "Going";
					case 3: return "Maybe";
					case 4: return "Not attending";
				}
			}.property('status')
		});


/*
		App.Module = DS.Model.extend({
			event: DS.belongsTo('event'),
			data: DS.attr(),
			name: DS.attr()
		});
*/
	}
);