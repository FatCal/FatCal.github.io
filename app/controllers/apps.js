define(['app/app','moment'],function(App,moment){
	App.AppsController = Ember.ArrayController.extend({
		
	});

	App.AppController = Ember.ObjectController.extend({

		evnts: function(){
			// var arr = Ember.A();
			// Ember.run.later(function(){
			// 	console.log("PUSHING!");
			// 	arr.push({title: "one"});

			// },2000);
			// return arr;
		 	var calendarId = this.get('model.calendar.id');
		 	var date = moment().startOf('day').format();
		 	var yearFromNow = moment().startOf('day').add('years',1).format();
			return this.store.find('event',{calendars: [calendarId], filter_from: date, filter_to: yearFromNow});

		}.property('model')
		// es: Em.computed(function(){
		// 	console.log("oh hai");
		// 	var calendarId = this.get('model.calendar.id');

		// 	var events = this.store.find('event',{calendars: [calendarId]});
		// 	return events;			
		// }).property().cacheable()
	});
});