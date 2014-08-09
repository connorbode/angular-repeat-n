var gulp = require('gulp')
  , shell = require('gulp-shell')
  , paths = { 
    src: 'src/angular-repeat-n.js',
    example: 'example',
    dist: 'dist'
  };

gulp.task('build', function () {
  return gulp.src(paths.src)
    .pipe(gulp.dest(paths.dist))
});

gulp.task('run-example-server', shell.task(['node ' + paths.example + '/server.js']));

gulp.task('example', ['build', 'run-example-server']);