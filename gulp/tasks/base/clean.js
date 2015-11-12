var gulp = require('gulp'),
    del = require('del');

gulp.task('clean', function(cb) {
    return del(['./gulp/tmp/preprocessed/*', './gulp/tmp/globbed/*', './www/webapp/*'], cb);
});

