
module.exports = function (grunt) {
    grunt.extendConfig({
        mkdir: {

        },
        copy: {
            'release': {

            }
        }
    });

    grunt.registerTask('release', [
        'common-release',
        'list-release',
        'detail-release',
        'home-release'
    ]);
};