
module.exports = function (grunt) {

    grunt.extendConfig({

        'watch': {
            'list': {
                files : [
                    'src/list/*',
                    'src/list/**/*'
                ],
                tasks: [ 'list' ]
            }
        },
        'less': {
            'list': {
                files: {
                    'asset/list.css': 'src/list/css/main.less'
                }
            }
        },
        'cssmin': {
            'list': {
                src: 'asset/list.css',
                dest: 'asset/list.css'
            }        
        },
        'copy': {
            'list': {
                'files': [{
                    filter: 'isFile',
                    expand: true,
                    cwd: 'src/list',
                    src: ['*.js'],
                    dest: 'asset/list'
                }]
            }
        },
        'requirejs': {
            'list': {
                options: {
                    'baseUrl': 'src/list/',
                    'name': 'main',
                    'paths': {
                        'zxui': '../../dep/zxui/src/ui',
                        'emitter': '../../dep/eventEmitter/EventEmitter',
                        'Q': '../../dep/q/q',
                        'site': 'empty:'
                    },
                    'findNestedDepandencies': true,                
                    'out': 'asset/list/main.js',
                    'preserveLicenseComments': true
                }
            } 
        },
        'clean': {
            'list': [
                'asset/list'
            ]
        }
    });

    grunt.registerTask('list', [
        'less:list',
        'copy:list'
    ]);

    grunt.registerTask('list-release', [
        'less:list',
        'cssmin:list',
        'clean:list',
        'requirejs:list'
    ]);

};