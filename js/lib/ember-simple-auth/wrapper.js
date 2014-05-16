define(['ember'],function(){
	console.log("oh hai asshole");
	return require(['/components/ember-simple-auth/ember-simple-auth-0.4.0.amd.min.js'],function(){
		console.log("i b requiring");
	});
});