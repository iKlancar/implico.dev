module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		less: {
			compile: {
				options: {
					// sourceMap: true,
					// sourceMapFilename: 'dist/css/booking-default.css.map',
					// sourceMapRootpath: '/'
					// report: 'min',
					cleancss: true // MINIFY
				},
				expand: true,
				cwd  :'src/less/',
				src  :'*.less',
				dest :'dist/css',
				ext  :'.min.css'
			}
		},
		watch: {
			options: {
				interval: 1500
			},
			allWatchedFiles: ['src/templates/*.hbs', 'src/*.js', 'dist/css/*'],
			allWatchedFiles: ['dist/css/*'],
			less: {
				files: ['src/less/**/*.less'],
				tasks: ['less']
			},
			css: {
				// Here we watch the files the less task will compile to
				// These files are sent to the live reload server after less compiles to them
				options: { livereload: 35729 },
				files: ['dist/css/*']
			},
			html: {
				files: ['**/*.html','**/*.css'],
				options: {
					livereload: true
				}
			}
		},
		clean: ["dist"],
		copy: {
			'glyphicon': {
				files: [
					// includes files within path
					{
						expand: true,
						src: ['src/fonts/*'],
						dest: 'dist/fonts',
						flatten: true,
						filter: 'isFile'}
					],
				},
			},
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// grunt.registerTask('default', ['clean', 'less']);
	grunt.registerTask('default', ['clean', 'less', 'copy:glyphicon']);
};