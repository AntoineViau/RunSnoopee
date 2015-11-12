var gulp = require('gulp'),
    preprocess = require('gulp-preprocess');

gulp.task('preprocessIndexForRelease', function(cb) {
    return gulp.src([
            './src/webapp/index.html'
        ])
        .pipe(preprocess({
            'context': {
                NODE_ENV: 'release'
            }
        }))
        .pipe(gulp.dest('./www/webapp/'));
});
