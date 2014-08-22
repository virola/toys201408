
module.exports = function (grunt) {

    grunt.extendConfig({

        'watch': {
            'zone': {
                files : [
                    'src/zone/*',
                    'src/zone/**/*'
                ],
                tasks: [ 'zone' ]
            }
        },
        'less': {
            'zone': {
                files: {
                    'asset/zone.css': 'src/zone/css/main.less'
                }
            }
        },
        'cssmin': {
            'zone': {
                src: 'asset/zone.css',
                dest: 'asset/zone.css'
            }        
        },
        'copy': {
            'zone': {
                'files': [{
                    filter: 'isFile',
                    expand: true,
                    cwd: 'src/zone',
                    src: ['*.js'],
                    dest: 'asset/zone'
                }]
            }
        },
        'requirejs': {
            'zone': {
                options: {
                    'baseUrl': 'src/zone/',
                    'name': 'main',
                    'paths': {
                        'zxui': '../../dep/zxui/src/ui',
                        'emitter': '../../dep/eventEmitter/EventEmitter',
                        'Q': '../../dep/q/q',
                        'site': 'empty:'
                    },
                    'findNestedDepandencies': true,                
                    'out': 'asset/zone/main.js',
                    'preserveLicenseComments': true
                }
            } 
        },
        'clean': {
            'zone': [
                'asset/zone'
            ]
        }
    });

    grunt.registerTask('zone', [
        'less:zone',
        'copy:zone'
    ]);

    grunt.registerTask('zone-release', [
        'less:zone',
        'cssmin:zone',
        'clean:zone',
        'requirejs:zone'
    ]);

};