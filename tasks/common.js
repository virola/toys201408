// 通用模块
module.exports = function (grunt) {

    grunt.extendConfig({
        'watch': {
            'common': {
                'files': [
                    'src/common/*',
                    'src/common/**/*'
                ],
                'tasks': ['common']
            }
        },
        'less': {
            'common': {
                'files': {
                    'asset/common.css': 'src/common/css/main.less'
                }
            }
        },
        'cssmin': {
            'common': {
                'files': {
                    'asset/common.css': 'asset/common.css'
                }
            }
        },
        'concat': {
            'common': {
                files: {
                    'asset/common/common.js': [
                        'src/common/jquery.scrollLoading.js',
                        'src/common/fixtop.js',
                        'src/common/html5support.js',
                        'src/common/base.js'
                    ],
                    'asset/common/toolbar.js': [
                        'src/common/toolbar.js'
                    ]
                }
            }
        },
        'uglify': {
            'options': {
                'mangle': {
                    'except': ['require', 'define', 'export', 'baidu']
                }
            },
            'common': {
                'files': {
                    'asset/common/common.js': ['asset/common/common.js'],
                    'asset/common/toolbar.js': 'asset/common/toolbar.js'
                }
            }
        },
        'clean': {
            'common': [
                'asset/common'
            ]
        }
    });


    // 通用模块 
    grunt.registerTask('common', [
        'less:common',
        'concat:common'
    ]);

    // 通用模块 release
    grunt.registerTask('common-release', [
        'less:common',
        'cssmin:common',
        'concat:common',
        'uglify:common'
    ]);
}