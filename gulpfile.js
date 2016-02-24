var process = require('process');

var gulp = require('gulp');
var ts = require('gulp-typescript');
var sass = require('gulp-sass');
var rename = require('gulp-rename');

var paths = {
  typescript: ['public/app/**/*.ts'],
  appSass: ['public/app/**/*.scss'],
  materialSass: ['node_modules/bootstrap-material-design/sass/**/_*.scss']
}

var tsProject = ts.createProject('tsconfig.json');

gulp.task('typescript', function(){
	var tsResult = tsProject.src()
		.pipe(ts(tsProject));
 
	return tsResult.js.pipe(gulp.dest('./'));
});


gulp.task('settings', function(){
  var tsResult = gulp.src('settings/' + process.env.NODE_ENV + '.settings.ts')
    .pipe(ts(tsProject));
    
    return tsResult.js
              .pipe(rename('settings.js'))
              .pipe(gulp.dest('app'));
});

gulp.task('app-sass', function(){
  return gulp.src(paths.appSass[0], {base: "./"})
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function(){
	gulp.watch(paths.typescript, ['typescript']);
  gulp.watch(paths.appSass, ['app-sass']);
});

gulp.task('default', ['typescript', 'settings', 'app-sass', 'watch'])