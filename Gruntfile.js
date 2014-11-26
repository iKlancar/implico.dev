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
		clean: ["dist"],
		includes: {
			files: {
				src: ['src/html/*.html'], // Source files
				dest: 'dist', // Destination directory
				flatten: true,
				cwd: '.'
				// options: {
					// silent: true,
					// template: '{{fileName}}';
				// }
			}
		},
		copy: {
			'glyphicon': {
				files: [
					// includes files within path
					{
						expand: true,
						src: ['src/fonts/*'],
						dest: 'dist/fonts',
						flatten: true,
						filter: 'isFile'
					}
				]
			},
			'img': {
				files: [
					// includes files within path
					{
						expand: true,
						cwd: 'src/img',
						src: '**/*', // copy all files and subfolders
						dest: 'dist/img',
						filter: 'isFile',
						flatten: true,
					}
				]
			},
			'js': {
				files: [
					// includes files within path
					{
						expand: true,
						cwd: 'src/js',
						src: '**/*', // copy all files and subfolders
						dest: 'dist/js',
						filter: 'isFile',
						// flatten: true,
					}
				]
			}
		},
		watch: {
			options: {
				interval: 1500
			},
			less: {
				files: ['src/less/**/*.less'],
				tasks: ['less'],
				options: {
					livereload: true
				}
			},
			html: {
				files: ['src/html/**/*.html'],
				tasks: ['includes'],
				options: {
					livereload: true
				}
			}
		}
	});

	// Load Grunt plugins
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// grunt.registerTask('default', ['clean', 'less']);
	grunt.registerTask('default', ['clean', 'includes', 'less', 'copy:glyphicon', 'copy:img', 'copy:js']);
};