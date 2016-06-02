var
gulp       = require('gulp'),
livereload = require('gulp-livereload');

gulp.task('fonts', function() {
    var stream = gulp
    .src([
        'node_modules/bootstrap/dist/fonts/*',
        'node_modules/font-awesome/fonts/*'
    ]);

    return stream
    .pipe(gulp.dest('dist/assets/fonts'))
    .pipe(livereload());
});