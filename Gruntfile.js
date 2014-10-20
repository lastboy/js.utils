
'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({


        pkg:grunt.file.readJSON('package.json'),

        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',


        concat: {
            noamd: {
                files: { './target/jsutils-min-all.js': [ 
                    "./node_modules/underscore/underscore-min.js",
                    './target/jsutils-min.js'
                ] }
            }

        },

        uglify: {
            noamd: {
                files: { './target/jsutils-min-all.js': ['./target/jsutils-min-all.js'] }
            }
        },


        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['target', 'test/out']
        }

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', [], function () {
        var Build = require("./build/build.js"),
            buildimpl;

        var done = this.async();

        buildimpl = new Build(function() {

            done(true);

            grunt.task.run('concat:noamd');
            grunt.task.run('uglify:noamd');

        });

    });

    grunt.registerTask('install', ['default']);
};
