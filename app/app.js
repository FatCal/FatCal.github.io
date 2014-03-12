define('app/app',
	[
		'handlebars',
		'emblem',
		'ember',
		'ember-data',
		'pickadate',
		'pickadate-date',
		'pickadate-time'
	],function(){


		console.log("app/app");
		var App = window.App = Ember.Application.create({
			VERSION: '1.0',
			rootElement: '#ember',
			ready: function()
			{
				this.set("Router.enableLogging",true)
			}
		});

		App.initializer({
			name: "loadCurrentUser",
			initialize: function(container,application) {
				App.deferReadiness();
				store = container.lookup("store:main");
				store.find("user","me").then(function(user){
					App.me = user;
					App.advanceReadiness();
				});
			}

		})

		Ember.PickADate = Ember.View.extend({
			attributes:['monthsFull', 'monthsShort', 'weekdaysFull', 'weekdaysShort', 'showMonthsShort', 'showWeekdaysFull', 'today','clear', 'format', 'formatSubmit', 'hiddenSuffix', 'firstDay', 'selectMonths','selectYears', 'min', 'max', 'disable', 'disablePicker'],
			events: ['onOpen', 'onClose', 'onSet', 'onStart'],
			
			type: 'text',
			tagName: 'input',
			className: 'pickadate',

			didInsertElement: function(){
				var options = {};
				var self = this;

				this.get('events').forEach(function(event){
					if(self[event])
						options[event] = self[event];
				});

				this.get('attributes').forEach(function(attr){
					if(self[attr])
						options[attr] = self[attr];
				});

				var onSetCallback = options.onSelect;
				options.onSet = function(){
					Ember.set(self,'value',this.get('select'));
					if(onSetCallback)
						onSetCallback.call(this);
				}

				options.onStart = function(){
					this.set('select',Ember.get(self,'value'));
				}

				this.$().pickadate(options);
			}
		});

		Ember.PickATime = Ember.View.extend({
			attributes:['clear','format','formatLabel','formatSubmit','hiddenPrefix','hiddenSuffix','interval','min','max','disable'],
			events: ['onStart','onOpen','onClose','onSet','onStop'],

			type: 'text',
			tagName: 'input',
			className: 'pickadate',

			didInsertElement: function(){
				var options = {};
				var self = this;

				this.get('events').forEach(function(event){
					if(self[event])
						options[event] = self[event];
				});

				this.get('attributes').forEach(function(attr){
					if(self[attr])
						options[attr] = self[attr];
				});

				var onSetCallback = options.onSelect;
				options.onSet = function(){
					Ember.set(self,'value',this.get('select'));
					if(onSetCallback)
						onSetCallback.call(this);
				}

				options.onStart = function(){
					this.set('select',Ember.get(self,'value'));
				}

				this.$().pickatime(options);				
			}
		});

		return App;
	}
);
