
module.exports = function (grunt) {
    grunt.extendConfig({
        mkdir: {

        },
        copy: {
            'release': {

            }
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
        'common-release',
        'list-release',
        'detail-release',
        'home-release',
        'zone-release'
    ]);
};