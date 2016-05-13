module.exports = function( grunt ) {

	// Configuration goes here 
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),



		// Stylus to css compilation
		stylus: {
				compile: {
						files: {
						'www/css/styles.css': 'dev/styl/main.styl'
					 }
				}
		},    


		// Jade to html compilation
		jade: {
			compile: {
				files: [ 
					{
						expand:true,
						cwd: 'dev/jade',
						src: '**/*.jade',
						dest: 'www',
						ext: '.html'
					},
					{
						expand:true,
						cwd: 'dev',
						src: '*.jade',
						dest: 'www',
						ext: '.html'
					},
				]
			}
		}, 


		// Move other files to production folder
		copy: {
			statics: {
				files: [
					{
						expand: true,
						cwd: 'dev/static/img',
						src: '**',
						dest: 'www/static/img',
						filter: 'isFile'
					},
					{
						expand: true,
						cwd: 'dev/styl/img',
						src: '**',
						dest: 'www/css/img',
						filter: 'isFile'
					},          
					{
						expand: true,
						cwd: 'dev/css',
						src: '**/*.*',
						dest: 'www/css',
						filter: 'isFile'
					}         

				],
			},
			scripts: {
				files: [
					{
						expand: true,
						cwd: 'dev/js',
						src: '**/*.js',
						dest: 'www/js',
						filter: 'isFile',
					}

				]       
			},
			data: {
				files: [
					{
						expand: true,
						cwd: 'dev/json',
						src: '**/*.json',
						dest: 'www/json',
						filter: 'isFile',
					}
				]               
			}
		 
		},

	 //tinyPNG
		tinypng: {
			options: {
					apiKey: "aVPPHhXqYGtuH1IrYcJAk4JNyTjDCxjw",
					checkSigs: true,
					sigFile: 'dev/file_sigs.json',
					summarize: true,
					showProgress: true,
					stopOnImageError: true
			},
			main: {
					expand:true,
					cwd: 'dev/static/img',
					src: '**/*', 
					dest: 'www/static/img'
			}
		},

		connect: {
			server: {
				options: {
					hostname: 'localhost',
					port: 2211,
					base: 'www'
				}
			}
		},



		 watch: {
				stylus:{
					files: ['dev/styl/*.styl'],
					tasks: ['stylus']
				},
				jade:{
					files: ['dev/jade/*.jade'],
					tasks: ['jade']
				},
				js:{
					files: ['dev/js/*.js','dev/lib/**/*.js'],
					tasks: ['copy:scripts']
				},
				statics:{
					files: ['dev/static/*.*'],
					tasks: ['copy:statics']
				},

		}

	});

	// Load plugins here
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-tinypng');

	grunt.registerTask('png',  ['tinypng']);
	grunt.registerTask('default',  ['jade','stylus','copy','connect','watch']);


};