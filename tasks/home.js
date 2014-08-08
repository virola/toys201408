
module.exports = function (grunt) {

    grunt.extendConfig({

        'watch': {
            'home': {
                files : [
                    'src/home/*',
                    'src/home/**/*'
                ],
                tasks: [ 'home' ]
            }
        },
        'less': {
            'home': {
                files: {
                    'asset/home.css': 'src/home/css/main.less'
                }
            }
        },
        'cssmin': {
            'home': {
                src: 'asset/home.css',
                dest: 'asset/home.css'
            }        
        },
        'copy': {
            'home': {
                'files': [{
                    filter: 'isFile',
                    expand: true,
                    cwd: 'src/home',
                    src: ['*.js'],
                    dest: 'asset/home'
                }]
            }
        },
        'requirejs': {
            'home': {
                options: {
                    'baseUrl': 'src/home/',
                    'name': 'main',
                    'paths': {
                        'emitter': '../../dep/eventEmitter/EventEmitter',
                        'Q': '../../dep/q/q',
                        'site': 'empty:'
                    },
                    'findNestedDepandencies': true,                
                    'out': 'asset/home/main.js',
                    'preserveLicenseComments': true
                }
            } 
        },
        'clean': {
            'home': [
                'asset/home'
            ]
        }
    });

    grunt.registerTask('home', [
        'less:home',
        'copy:home'
    ]);

    grunt.registerTask('home-release', [
        'less:home',
        'cssmin:home',
        'clean:home',
        'requirejs:home'
    ]);

};