var gulp = require('gulp'),
    preprocess = require('gulp-preprocess');

gulp.task('preprocessIndexForDev', function(cb) {
    return gulp.src([
            './gulp/tmp/globbed/index.html'
        ])
        .pipe(preprocess({
            'context': {
                NODE_ENV: 'dev'
            }
        }))
        .pipe(gulp.dest('./www/webapp/'));
});
