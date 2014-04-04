define
(
	[
		'app/app',
		'ember',
		'moment'
	],function(App,ember,moment)
	{
		App.EventsController = Ember.ArrayController.extend
		({

		});

		App.EventController = Ember.ObjectController.extend(
		{
			isAttendee: false,
			isNotEditing: true,
			attendingStatusSelected: 0,
			_attendingStatusInitialized: false,
			showAttendingHero: false,
			showMaybeHero: false,
			showRejectHero: false,
			startDate: function(){
				return moment(this.get('model.start_date')).valueOf();
			}.property('start_date'),
			startTime: function(){
				var d = this.get('model.start_time');
				return [d.getHours(),d.getMinutes()]; 
			}.property('start_time'),
			endDate: function(){
				return moment(this.get('model.end_date')).valueOf();
			}.property('end_date'),
			endTime: function(){
				var d = this.get('model.end_time');
				return [d.getHours(),d.getMinutes()]; 
			}.property('stop_time'),
			when: function(){
				var start_time = this.get('model.start_time');
				var end_time = this.get('model.end_time');

				m = moment(start_time);
				ts = moment({
					hour: start_time.getHours(),
					minutes: start_time.getMinutes()
				});
				te = moment({
					hour: end_time.getHours(),
					minutes: end_time.getMinutes()
				});
				return m.format("dddd Do MMMM") + ", " + ts.format("h:mm a")+" - "+te.format("h:mm a");
			}.property('start_date','start_time','end_time'),
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