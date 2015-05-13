module.exports = function(grunt) {

	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		browserify: {
			dist: {
				files: {
					'dist/EventEmitter.js' : ['src/EventEmitter.js']
				},
				options: {
					browserifyOptions: {
						'standalone': 'EventEmitter'
					}
				}
			}
		},

		'closure-compiler': {
			frontend: {
				closurePath: '/usr/local/Cellar/closure-compiler/20150315/libexec',
				js: 'dist/EventEmitter.js',
				jsOutputFile: 'dist/EventEmitter.min.js',
				options: {
					'compilation_level': 'ADVANCED',
					// language_in: 'ECMASCRIPT5_STRICT',
					'language_in': 'ECMASCRIPT5'
				}
			}
		},

		watch: {
			grunt: {
				files: [ 'Gruntfile.js' ],
				options: {
					reload: true
				}
			},
			src: {
				files: ['src/**/*'],
				tasks: ['develop']
			},
			options: {
				spawn: false
			}
		}
	});


	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-closure-compiler');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['browserify', 'closure-compiler']);
	grunt.registerTask('develop', ['browserify', 'watch']);
};