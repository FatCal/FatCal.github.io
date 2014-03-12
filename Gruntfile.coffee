module.exports = (grunt) ->
	grunt.initConfig 
		pkg: grunt.file.readJSON('package.json')
		uglify: 
			options: 
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			build:	
				src: 'js/main.js'
				dest: 'build/<%= pkg.name %>.min.js'
		sass:
			dist:
				files: 
					'css/style.css' : 'sass/style.scss'
		watch:
			css:
				files: '**/*.scss'
				tasks: ['sass']
		'http-server':
			dev:
				runInBackground: true
		requirejs: 
				compile:
					options:
						baseUrl: "."
						paths:
							requireLib: 'components/requirejs/require'
						mainConfigFile: "js/main.js"
						name: "js/main"
						out: "js/pmain.js"
						include: ['requireLib']
				'compile-css':
					options:
						cssIn: "css/style.css"
						out: "css/pstyle.css"
		'string-replace':
			dev:
				files:
					"index.html"
				options:
					replacements: [
						pattern: '$REQUIREJS'
						replacement: 'src="components/requirejs/require.js" data-main="/js/main"'
					]
			production:
				files:
					"index.html"
				options:
					replacements: [
						pattern: '$REQUIREJS'
						replacement: 'src="/js/pmain.js"'
					]




			
	grunt.loadNpmTasks 'grunt-contrib-watch'
	grunt.loadNpmTasks 'grunt-contrib-uglify'
	grunt.loadNpmTasks 'grunt-contrib-sass'
	grunt.loadNpmTasks 'grunt-http-server';
	grunt.loadNpmTasks 'grunt-contrib-requirejs'
	grunt.loadNpmTasks 'grunt-string-replace'

	grunt.registerTask 'default',[]
	grunt.registerTask 'serve',['http-server:dev','watch']
	grunt.registerTask 'build',['sass','requirejs'] 

