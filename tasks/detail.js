
module.exports = function (grunt) {

    grunt.extendConfig({

        'watch': {
            'detail': {
                files : [
                    'src/detail/*',
                    'src/detail/**/*'
                ],
                tasks: [ 'detail' ]
            }
        },
        'less': {
            'detail': {
                files: {
                    'asset/detail.css': 'src/detail/css/main.less'
                }
            }
        },
        'cssmin': {
            'detail': {
                src: 'asset/detail.css',
                dest: 'asset/detail.css'
            }        
        },
        'copy': {
            'detail': {
                'files': [{
                    filter: 'isFile',
                    expand: true,
                    cwd: 'src/detail',
                    src: ['*.js'],
                    dest: 'asset/detail'
                }]
            }
        },
        'requirejs': {
            'detail': {
                options: {
                    'baseUrl': 'src/detail/',
                    'name': 'main',
                    'paths': {
                        'emitter': '../../dep/eventEmitter/EventEmitter',
                        'Q': '../../dep/q/q',
                        'site': 'empty:'
                    },
                    'findNestedDepandencies': true,                
                    'out': 'asset/detail/main.js',
                    'preserveLicenseComments': true
                }
            } 
        },
        'clean': {
            'detail': [
                'asset/detail'
            ]
        }
    });

    grunt.registerTask('detail', [
        'less:detail',
        'copy:detail'
    ]);

    grunt.registerTask('detail-release', [
        'less:detail',
        'cssmin:detail',
        'clean:detail',
        'requirejs:detail'
    ]);

};