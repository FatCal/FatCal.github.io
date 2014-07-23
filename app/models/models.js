define
(
	[
		'app/app',
		'moment',
		'ember',
		'ember-data'
	],
	function(App,moment)
	{
		App.Event = DS.Model.extend({
			publisher: DS.belongsTo('calendar'),
			attendees: DS.hasMany('attendee',{async: true}),
//			comments: DS.hasMany('comments',{async: true}),

			title: DS.attr("string"),
			description: DS.attr("string"),
			start_time: DS.attr("ISO8601"),
			end_time: DS.attr("ISO8601"),
			filter_time: DS.attr("ISO8601"),
			tz: DS.attr("string"),
			event_type: DS.attr(),

			when: function(){
				var start_time = this.get('start_time');
				var end_time = this.get('end_time');
				ts = moment(start_time);
				te = moment(end_time);
				return ts.format("dddd Do MMMM") + ", " + ts.format("h:mm a")+" - "+te.format("h:mm a");
			}.property('start_time','end_time'),


//			modules: DS.hasMany('module')
		});

		App.Calendar = DS.Model.extend({
			user: DS.belongsTo("user"),
//			application: DS.belongsTo("app")
		});

		App.User = DS.Model.extend({
			calendar: DS.belongsTo("calendar"),
			firstname: DS.attr(),
			lastname: DS.attr(),
			email: DS.attr(),
			avatar: DS.attr(),

			displayName: function(){
				if(App.me.id == this.id)
					return "You";
				else
					return this.get('firstname') + ' ' + this.get('lastname');

			}.property('firstname','lastname'),
			avatarURL: function(){
				if(this.get('avatar'))
					this.get('avatar');
				else
					return '/img/default_avatar.jpg'
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

		App.App = DS.Model.extend({
			//users: DS.hasMany("user"),
			calendar: DS.belongsTo("calendar"),
			name: DS.attr(),
			logo: DS.attr()
		});

		App.Comment = DS.Model.extend({
			calendar: DS.belongsTo("calendar"),
			event: DS.belongsTo("event"),
			body: DS.attr(),
			created_at: DS.attr("ISO8601")
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