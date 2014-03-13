define
(
	['app/app'],
	function(App)
	{
		App.PickADate = Ember.Component.extend({
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
	
		Em.Handlebars.helper("pick-a-date",App.PickADate);
	}
)