module.exports = function(grunt){
	"use strict";

	/*
		Grunt installation:
		-------------------
			npm install -g grunt-cli
			npm install -g grunt-init
			npm init (creates a `package.json` file)

		Project Dependencies:
		---------------------
			npm install grunt --save-dev
			npm install grunt-contrib-watch --save-dev
			npm install grunt-contrib-jshint --save-dev
			npm install grunt-contrib-uglify --save-dev
			npm install grunt-contrib-concat --save-dev
			npm install grunt-contrib-requirejs --save-dev
			npm install grunt-contrib-sass --save-dev
			npm install grunt-contrib-imagemin --save-dev
			npm install grunt-contrib-htmlmin --save-dev
			npm install grunt-contrib-connect --save-dev
			npm install grunt-contrib-jasmine --save-dev
			npm install grunt-template-jasmine-requirejs --save-dev
	*/

	// Project configuration.
	grunt.initConfig({

		// Store your Package file so you can reference its specific data whenever necessary
		pkg: grunt.file.readJSON('package.json'),


		// Task Delegation
		sass:{
			dist:{
				options:{
					style:'compressed',
					require:['./assets/styles/scss/helpers/url64.rb']
				},
				expand: true,
				cwd: './app/styles/scss',
				src:['*.scss'],
				dest: './app/styles/css',
				ext: '.css'
			},
			dev:{
				options:{
					style:'expanded',
					debugInfo:true,
					lineNumbers:true,
					require:['./app/styles/scss/helpers/url64.rb']
				},
				expand:true,
				cwd:'./app/styles/scss/',
				src:['*.scss'],
				dest:'./app/styles/css',
				ext: '.css'
			}
		},
		requirejs: {
			compile: {
				options: {
					baseUrl: './app',
					mainConfigFile: './app/main.js',
					dir: './app/release/',
					fileExclusionRegExp: /^\.|node_modules|Gruntfile|\.md|package.json/,
					// optimize: 'none',
					modules: [
						{
							name: 'main'
							// include: ['module'],
							// exclude: ['module']
						}
					]
				}
			}
		},

		// Used to connect to a locally running web server
		// (so Jasmine can test against a DOM)
		connect:{
			test:{
				port:8000
			}
		},
		jasmine: {
			/*
				Note:
				In case there is a /release/ directory found, we don't want to run tests on that 
				so we use the ! (bang) operator to ignore the specified directory
			*/
			src: ['app/**/*.js', '!app/release/**'],
			options: {
				host: 'http://127.0.0.1:8000/',
				specs: 'specs/**/*Spec.js',
				helpers: ['specs/helpers/*Helper.js', 'specs/helpers/sinon.js'],
				template: require('grunt-template-jasmine-requirejs'),
				templateOptions: {
					requireConfig: {
						baseUrl: './',
						mainConfigFile: 'app/main.js'
					}
				}
			}
		},

		jshint: {
			/*
				Note:
				In case there is a /release/ directory found, we don't want to lint that 
				so we use the ! (bang) operator to ignore the specified directory
			*/
			files: ['Gruntfile.js', 'app/**/*.js', '!app/release/**', 'modules/**/*.js', 'specs/**/*Spec.js'],
			options: {
				curly:   true,
				eqeqeq:  true,
				immed:   true,
				latedef: true,
				newcap:  true,
				noarg:   true,
				sub:     true,
				undef:   true,
				boss:    true,
				eqnull:  true,
				browser: true,

				globals: {
					// AMD
					module:     true,
					require:    true,
					requirejs:  true,
					define:     true,

					// Environments
					console:    true,

					// General Purpose Libraries
					$:          true,
					jQuery:     true,

					// Testing
					sinon:      true,
					describe:   true,
					it:         true,
					expect:     true,
					beforeEach: true,
					afterEach:  true
				}
			}
		},

		concat:{
			options:{
				// define a string to put between each file in the concatenated output
				separator: ';'
			},
			dist:{
				// the files to concatenate
				src: ['app/**/*.js'],
				// the location of the resulting JS file
				dest: 'dist/<%= pkg.name %>.js'
			}
		},

		uglify:{
			options:{
				// the banner is inserted at the top of the output
				banner: "/*!\n* <%= pkg.name %> by @ninnemana \n* <%= pkg.description %> \n* Copyright 2012 CURT Manufacturing, LLC.\n*/\n"
			},
			dist:{
				files:{
					'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},

		// `optimizationLevel` is only applied to PNG files (not JPG)
		imagemin: {
			png: {
				options: {
					optimizationLevel: 7
				},
				files: [
					{
						expand: true,
						cwd: './app/images/',
						src: ['**/*.png'],
						dest: './app/images/compressed/',
						ext: '.png'
					}
				]
			},
			jpg: {
				options: {
					progressive: true
				},
				files: [
					{
						expand: true,
						cwd: './app/images/',
						src: ['**/*.jpg'],
						dest: './app/images/compressed/',
						ext: '.jpg'
					}
				]
			}
		},

		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
					removeEmptyAttributes: true,
					removeCommentsFromCDATA: true,
					removeRedundantAttributes: true,
					collapseBooleanAttributes: true
				},
				files: {
					// Destination : Source
					'./index-min.html': './index.html'
				}
			}
		},

		// Run: `grunt watch` from command line for this section to take effec
		watch:{
			files:['<%= jshint.files %>','<%= jasmine.options.specs %>'],
			tasks: 'default'
		}
	});

	// Load NPM Tasks
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	// Default Task
	grunt.registerTask('default', ['jshint', 'connect', 'jasmine', 'sass:dev']);

	// Unit Testing Task
	grunt.registerTask('test', ['connect', 'jasmine']);

	// Release Task
	grunt.registerTask('release', ['jshint', 'connect', 'jasmine', 'requirejs', 'sass:dist', 'imagemin', 'htmlmin', 'concat','uglify']);
};