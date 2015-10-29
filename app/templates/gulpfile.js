var gulp = require("gulp");
var addsrc = require("gulp-add-src");
var tsc = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var vinylPaths = require("vinyl-paths");
var del = require("del");
var tsd = require("gulp-tsd");
var copy = require("gulp-copy");
var tslint = require('gulp-tslint');

gulp.task("clean", function () {
	return gulp.src(["js/*/**", "dist"])
		.pipe(vinylPaths(del));
});

gulp.task("copy-templates", function() {
	gulp.src("src/template/*.html")
		.pipe(copy("js", {
			"prefix" : 1
		}));
		
});

var tsPath = require("./tsconfig.json").filesGlob;

var tscOptions = {
	module: "amd",
	target : "ES5"
};

gulp.task("lint", function() {
	gulp.src(tsPath)
		.pipe(tslint({
			configuration : {
				rules : {
					// add your tslint rules here, see https://www.npmjs.com/package/tslint
				}
			}
		}))
		.pipe(tslint.report("verbose"));
});


var tsProject = tsc.createProject("tsconfig.json");

gulp.task("compile", function() {
	var tsResult = gulp.src(tsPath)
		.pipe(sourcemaps.init())
		.pipe(tsc(tsProject));
		
	return tsResult.js
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('js'));
});

gulp.task("watch", ["clean", "copy-templates", "compile"], function() {
    gulp.watch("src/**/*.ts", ["compile"]);
    gulp.watch("src/**/*.html", ["copy-templates"]);
});


gulp.task("dist", ["clean", "copy-templates", "compile"], function() {
	gulp.src(tsPath)
		.pipe(tsc(tscOptions))
		.pipe(gulp.dest("js"));
	gulp.src(["js", "index.html"])
		.pipe(gulp.dest("dist"));
});
