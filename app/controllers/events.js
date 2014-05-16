define
(
	[
		'app/app',
		'ember',
		'moment',
		'jstz',
		'ember-simple-auth'
	],function(App,ember,moment,jstz)
	{

		App.EventsController = Ember.ArrayController.extend
		({
		});

		App.EventEditController = Ember.ObjectController.extend({
			actions:{
				save: function(){
					this.get('model').save();
				}
			}
		});

		App.ExternalController = Ember.ObjectController.extend({
			isAttendee: false,
			isNotEditing: true,
			attendingStatusSelected: 0,
			_attendingStatusInitialized: false,
			showAttendingHero: false,
			showMaybeHero: false,
			showRejectHero: false,
			startTime: function(){
				var d = this.get('model.start_time');
				return [d.getHours(),d.getMinutes()]; 
			}.property('start_time'),
			endTime: function(){
				var d = this.get('model.end_time');
				return [d.getHours(),d.getMinutes()]; 
			}.property('stop_time'),
			attendee: function(){
				var attendee = null;
				var eventId = this.get('model.id');
				//FIXME: theres probably a better way of finding the correct attending status
				this.store.all('attendee').forEach(function(att){
					if(att.get('calendar.id') == App.me.get('calendar.id') && 
					   att.get('event.id') == eventId)
					{	
						attendee = att;
						return;
					}
				});	

				return attendee;				
			},
			updateStatus: function(element,property)
			{
				var isInited = this.get('_attendingStatusInitalized');
				console.log("attending status updated, maybe update?");
				if(isInited)
				{
					console.log("posting!");
					var status = this.get('attendingStatusSelected');
					var attendee = this.attendee();
					attendee.set('status',status);
					attendee.save();

					this.set('showAttendingHero',status == 2);
					this.set('showMaybeHero',status == 3);
					this.set('showRejectHero',status == 4);
				}
				else
				{
					this.set('_attendingStatusInitalized',true);
				}
			}.observes('attendingStatusSelected'),
			showHero: function(){
				return this.get('showAttendingHero') || this.get('showMaybeHero') || this.get('showRejectHero')
			}.property('showAttendingHero','showMaybeHero','showRejectHero'),
			modelSet: function(controller,property)
			{
				var att = this.attendee();
				var isAttendee = att != null

				controller.set('isAttendee',isAttendee);
				if(isAttendee)
				{
					controller.set('attendingStatusSelected',att.get('status'));
					console.log('attendingstatus updated to '+this.get('attendingStatusSelected'));
				}
			}.observes('model'),
			tz : function()
			{
//				var tz = jstz.determine;
//				return tz.name();
				return this.get('model.tz');
			}.property('model.tz'),
			actions: {
				edit: function()
				{
					this.set('isNotEditing',false);
				},
				onCancelClick: function()
				{
					this.set('isNotEditing',true);
				}
			}

		});
	}
);