'use strict';
/*
SECRET COW LEVEL - HTML5 Gruntfile Configuration
Author: justin@secretcowlevel.com
Date: 11.08.2013
 */

module.exports = function (grunt) {
    grunt.initConfig(
    {
        // Give Grunt access to the package.json file info
        pkg: grunt.file.readJSON('package.json'),

        // this will uglify/minify/concat our files
        uglify:
        {
            scl:
            {
                src: ['lib/client/js/*.js'],
                dest: 'static/js/scl.min.js',
                options: {
                    mangle: false,
                    compress: false,
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */'
                }
            },
            vendor:
            {
                src: ['lib/client/vendor/*.js'],
                dest: 'static/js/vendor.min.js',
                options: {
                    mangle: false,
                    compress: false,
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - thirdparty requirements - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */'
                }
            }
        },

        // We use this to make sure our JS files follow our spec
        jshint:
        {
            server:
            {
                src: ['./*.js', 'lib/*.js'],
                options:
                {
                    'jshintrc': true,
                    'ignores': 'newrelic.js'
                }
            },
            client:
            {
                src: ['lib/client/js/*'],
                options:
                {
                    'jshintrc': true,
                    'ignores': 'newrelic.js'
                }
            }
        },

        // Watch for changes to trigger events
        watch:
        {
            client:
            {
                files: ['lib/client/**/*.js', 'lib/*.js', './*.js' ],
                tasks: [ 'jshint', 'uglify']
            },
        },

        // restart node server, if necessary
        nodemon:
        {
            dev:
            {
                options:
                {
                    file: 'app.js',
                }
            }
        },

        // This allows us to concurrently watch JS for tasks and nodemon to restart
        concurrent:
        {
            dev:
            {
                tasks: ['nodemon', 'watch'],
                options:
                {
                    logConcurrentOutput: true
                }
            }
        },
        bower: {
            dev: {
                dest: 'lib/client/vendor'
            }
        },
        jsbeautifier : {
            files : ['app.js', 'lib/*.js', 'lib/client/*.js'],
            options : {
                js: {
                    braceStyle: 'end-expand',
                    breakChainedMethods: false,
                    e4x: false,
                    evalCode: false,
                    indentChar: ' ',
                    indentLevel: 1,
                    indentSize: 4,
                    indentWithTabs: false,
                    jslintHappy: false,
                    keepArrayIndentation: false,
                    keepFunctionIndentation: false,
                    maxPreserveNewlines: 10,
                    preserveNewlines: true,
                    spaceBeforeConditional: true,
                    spaceInParen: false,
                    unescapeStrings: false,
                    wrapLineLength: 80
                }
            }
        }
    });

    // Load the plugins we want to use
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-bower');

    // Register the tasks to run
    grunt.registerTask('default', [ 'jshint', 'bower', 'uglify', 'concurrent' ]);
};