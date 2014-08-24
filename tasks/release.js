
module.exports = function (grunt) {
    grunt.extendConfig({
        jshint: {
            options: {
                jshintrc: 'src/.jshintrc'
            },
            ignore_warning: {
                options: {
                    '-W014': true,
                    '-W102': true
                }
            },
            'all': [
                'src/**/*.js'
            ]
        }
    });

    grunt.registerTask('debug', [
        'common',
        'list',
        'detail',
        'home',
        'zone'
    ]);

    grunt.registerTask('release', [
        'jshint:all',
        'common-release',
        'list-release',
        'detail-release',
        'home-release',
        'zone-release'
    ]);
};