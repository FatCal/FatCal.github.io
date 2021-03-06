define(
	['app/app'],
	function(App){
		App.RadioButton = Ember.Component.extend({
		    tagName : "input",
		    type : "radio",
		    attributeBindings : [ "name", "type", "value", "checked:checked:", "disabled" ],
		    click : function() {
		        this.set("selection", this.$().val())
		    },
		    checked : function() {
		        return this.get("value") == this.get("selection");   
		    }.property()
		});
		Em.Handlebars.helper('radio-button',App.RadioButton);
	}
)
