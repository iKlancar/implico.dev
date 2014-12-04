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
			},
			'anim': {
				files: [
					// includes files within path
					{
						expand: true,
						cwd: 'src/anim',
						src: '**/*', // copy all files and subfolders
						dest: 'dist/anim',
						filter: 'isFile',
						// flatten: true,
					}
				]
			},
			'htaccess': {
				files: [
					// includes files within path
					{
						expand: true,
						// cwd: 'src/.htaccess',
						src: 'src/.htaccess', // copy all files and subfolders
						dest: 'dist/',
						filter: 'isFile',
						flatten: true
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
		},
		htmlclean: {
			// options: {
			// 	protect: /<\!--%fooTemplate\b.*?%-->/g,
			// 	edit: function(html) { return html.replace(/\begg(s?)\b/ig, 'omelet$1'); }
			// },
			deploy: {
				expand: true,
				cwd: 'dist',
				src: '**/*.html',
				dest: 'dist'
			}
		},
		'ftp-deploy': {
			'production': {
				auth: {
					host: 'ftp.implico.si',
					port: 21,
					authKey: 'implicoKey'
				},
				src: 'dist',
				dest: '/public_html',
				exclusions: ['dist/.DS_Store', 'dist/Thumbs.db', 'dist/tmp'],
				server_sep: '/'
			}
		},
	});

	// Load Grunt plugins
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// grunt.registerTask('default', ['clean', 'less']);
	grunt.registerTask('dev', ['clean', 'includes', 'less', 'copy:glyphicon', 'copy:img', 'copy:js', 'copy:anim', 'copy:htaccess']);
	grunt.registerTask('production', ['clean', 'includes', 'less', 'copy:glyphicon', 'copy:img', 'copy:js', 'copy:anim', 'copy:htaccess', 'htmlclean', 'ftp-deploy:production']);

	grunt.task.registerTask('default', 'default', function(id, debug) {
	grunt.log.subhead('grunt dev');
	grunt.log.writeln('Builds all files for local development. Availible at "www.implico.dev".');
	grunt.log.subhead('grunt production');
	grunt.log.writeln('Builds all files and ftp to live server. Availible at "www.implico.si".');

});
};