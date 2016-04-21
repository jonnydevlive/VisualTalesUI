var process = require('process');

var gulp = require('gulp');
var ts = require('gulp-typescript');
var rename = require('gulp-rename');

var paths = {
  typescript: ['app/**/*.ts'],
  appSass: ['app/**/*.scss']
}

var tsProject = ts.createProject('tsconfig.json');

gulp.task('settings', function(){
  var tsResult = gulp.src('settings/' + process.env.NODE_ENV + '.settings.ts')
    .pipe(ts(tsProject));
    
    return tsResult.js
              .pipe(rename('settings.js'))
              .pipe(gulp.dest('app'));
});