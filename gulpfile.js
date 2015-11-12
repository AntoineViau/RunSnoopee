var gulp = require('gulp'),
    requireDir = require('require-dir'),
    gulpSequence = require('gulp-sequence');


// https://medium.com/@_rywar/spreading-gulp-tasks-into-multiple-files-2f63d8c959d5
requireDir('./gulp/tasks', {
    recurse: true
});

gulp.task('build-dev', function(cb) {
    gulpSequence(
        'clean',
        'globIndex',
        'preprocessJs',
        'preprocessIndexForDev',
        'copyPreprocessed',
        'copyVendors',
        'copyImages'
    )(cb);
});

gulp.task('build-release', function(cb) {
    gulpSequence(
        'clean',
        'preprocessJs',
        'concatAndUglifyJs',
        'concatCss',
        'preprocessIndexForRelease',
        'copyVendors',
        'copyImages',
        'copyTemplates'
    )(cb);
});
