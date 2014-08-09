var gulp = require('gulp')
  , shell = require('gulp-shell')
  , karma = require('karma').server
  , paths = { src: 'src/angular-repeat-n.js',
              example: 'example',
              dist: 'dist' }
  , globs = { karmaFiles: 'src/**/*.js' }
  , karmaConf = { browsers: ['PhantomJS'],
                  frameworks: ['jasmine'],
                  files: ['bower_components/angular/angular.js', globs.karmaFiles] }


gulp.task('build', function () {
  return gulp.src(paths.src)
    .pipe(gulp.dest(paths.dist))
});

gulp.task('run-example-server', shell.task(['node ' + paths.example + '/server.js']));

gulp.task('test', function () {
  karma.start(karmaConf, function () {});
})

gulp.task('example', ['build', 'run-example-server']);