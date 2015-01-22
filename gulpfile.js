var gulp = require('gulp')
  , shell = require('gulp-shell')
  , karma = require('karma').server
  , ngmin = require('gulp-ngmin')
  , jsmin = require('gulp-jsmin')
  , rename = require('gulp-rename')
  , paths = { src: 'src/angular-repeat-n.js',
              example: 'example',
              dist: 'dist' }
  , globs = { karmaFiles: 'src/**/*.js' }
  , karmaConf = { browsers: ['PhantomJS'],
                  frameworks: ['jasmine'],
                  files: [
                    'bower_components/angular/angular.js', 
                    'bower_components/angular-mocks/angular-mocks.js',
                    'node_modules/lodash/lodash.js',
                    globs.karmaFiles
                  ],
                  preprocessors: {
                    'src/**/*.js': ['coverage']
                  },
                  reporters: ['progress', 'coverage'],
                  singleRun: true
                }


gulp.task('build', function () {
  return gulp.src(paths.src)
    .pipe(gulp.dest(paths.dist))
    .pipe(ngmin())
    .pipe(jsmin())
    .pipe(rename('angular-repeat-n.min.js'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('run-example-server', shell.task(['node ' + paths.example + '/server.js']));

gulp.task('test', function () {
  karma.start(karmaConf, function () {});
})

gulp.task('example', ['build', 'run-example-server']);