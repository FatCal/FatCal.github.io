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

		App.EventController = Ember.ObjectController.extend
		({
			isAttendee: false,
			isNotEditing: true,
			attendingStatusSelected: 0,
			_attendingStatusInitalSet: false,
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
				var start_date = this.get('model.start_date');
				var start_time = this.get('model.start_time');
				var end_time = this.get('model.end_time');

				m = moment({
						year: start_date.getYear(),
						month: start_date.getMonth(),
						day: start_date.getDay(),
					});
				ts = moment({
					hour: start_time.getHours(),
					minutes: start_time.getMinutes()
				});
				te = moment({
					hour: end_time.getHours(),
					minutes: end_time.getMinutes()
				});
				return m.format("MMMM Do") + ", " + ts.format("h:mm a")+" - "+te.format("h:mm a");
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
				var isInited = this.get('_attendingStatusInitalSet')
				if(!isInited)
				{
					var status = this.get('attendingStatusSelected');
					var attendee = this.attendee();
					attendee.set('status',status);
					attendee.save();
				}
				else
				{
					this.set('_attendingStatusInitalSet',true);
				}
			}.observes('attendingStatusSelected'),
			modelSet: function(controller,property)
			{
				var att = this.attendee();
				var isAttendee = att != null

				controller.set('isAttendee',isAttendee);
				if(isAttendee)
					controller.set('attendingStatusSelected',att.get('status'));


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