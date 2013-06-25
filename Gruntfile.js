/*global module:false*/
module.exports = function(grunt){
	"use strict";

	// Project Configuration
	grunt.initConfig({
		// Task Configuration
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['src/**/*.js'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				banner: '/*!\n Author: <%= pkg.author.name %>\n<%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},
		jshint:{
			options: {
				node : true,
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				unused: true,
				boss: true,
				eqnull: true,
				globals: {}
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			lib_test: {
				src: ['src/**/*.js', '!src/lib/**/*.js']
			}
		},
		watch:{
			gruntfile:{
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfule']
			},
			lib_test:{
				files: '<%= jshint.lib_test.src %>',
				tasks:['jshint:lib_test']
			}
		},
		connect:{
			test: {
				port: 8000,
				base: '.'
			}
		},
		jasmine:{
			requirejs:{
				src: 'test/fixtures/requirejs/src/**/*.js',
				options:{
					specs: 'test/fixtures/requirejs/spec/*Spec.js',
					helpers: 'test/fixtures/requirejs/spec/*Helper.js',
					host: 'http://127.0.0.1:<%= connect.test.port %>/',
					template: require('./'),
					templateOptions:{
						requireConfigFile: 'test/fixtures/requirejs/src/main.js',
						requireConfig:{
							baseUrl: './test/fixtures/requirejs/src/',
							config:{
								sum:{
									description: "Sum module (overridden)"
								}
							}
						}
					}
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.registerTask('test', ['connect', 'jasmine:requirejs']);

	grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'test']);

};