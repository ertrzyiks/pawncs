module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jscs: {
            options: {
                config: ".jscsrc",
                reporter: "checkstyle",
                reporterOutput: "logs/checkstyle_jscs.xml"
            },
            test: {
                files: {
                    src: [
                        'lib/**/*.js',
                        'index.js'
                    ]
                }
            }
        },

        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            test: {
                files: {
                    src: [
                        'lib/**/*.js',
                        'index.js'
                    ]
                },
                options: {
                    reporter: "checkstyle",
                    reporterOutput: "logs/checkstyle_js.xml"
                }
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    captureFile: 'logs/mocha.xml' // Optionally capture the reporter output to a file
                },
                src: ['test/**/*.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks("grunt-jscs");
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('default', ['test']);

    grunt.registerTask('test', ['jscs', 'jshint:test', 'mocha']);
    grunt.registerTask('mocha', ['mochaTest']);
};
