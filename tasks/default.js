var
gulp = require('gulp');

gulp.task('default', function() {
    gulp.start('libs', 'app', 'css', 'fonts', 'html', 'images', 'connect', 'watch');
});
