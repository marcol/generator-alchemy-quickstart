/*jshint node:true*/

module.exports = function (grunt) {

    'use strict';

    // show elapsed time at the end
    require('time-grunt')(grunt);

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        config: {
            src: '<%= projSource %>',
            dist: '<%= projDist %>',
            images: 'bin'
        },

        'bower-install': {
            src: {
                html: '<%%= config.src %>/index.html',
                ignorePath: '<%%= config.src %>/'
            }
        },

        watch: {
            livereload: {
                options: {
                    livereload: '<%%= connect.options.livereload %>'
                },
                files: [
                    '<%%= config.src %>/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '{.tmp,<%%= config.src %>}/scripts/{,*/}*.js',
                    '<%%= config.src %>/<%%= config.images %>/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
                ]
            }
        },

        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: 'localhost' // '0.0.0.0' to access the server from outside
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '<%%= config.src %>',
                        '.tmp'
                    ]
                }
            }
        },

        clean: {
            server: '.tmp'
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%%= config.src %>/scripts/{,*/}*.js'
            ]
        }

    });

    // Tasks
    grunt.registerTask('default', ['jshint']);

    grunt.registerTask('serve', function () {
        grunt.task.run([
            'clean:server',
            'connect:livereload',
            'watch'
        ]);
    });

};