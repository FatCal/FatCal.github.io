define
(
	["app/app",'moment'],
	function(App,moment)
	{
		App.PickATime = Ember.Component.extend({
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
					this.set('select',moment(Ember.get(self,'value')).toDate());
				}

				this.$().pickatime(options);				
			}
		});
		Em.Handlebars.helper("pick-a-time",App.PickATime);
	}
)