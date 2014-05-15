define(['app/app','moment'],function(App,moment){
	DS.ISO8601Transform = DS.Transform.extend({
		deserialize: function(serialized){
			return serialized;
		},
		serialize: function(deserialized){
			return moment(deserialized).format();
		}
	});

	App.register("transform:ISO8601",DS.ISO8601Transform);
});