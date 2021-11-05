const {src, dest, watch, parallel} = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber'); //evitar que los errores scss cancelen el watcher
const autoprefixer = require('autoprefixer'); //nav engine
const cssnano = require('cssnano'); //comprimir css
const postcss = require('gulp-postcss'); //transformaciones
const sourcemaps = require('gulp-sourcemaps'); //ubicar scss's para lectura

const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const avif = require('gulp-avif');

const terser = require('gulp-terser-js'); //mejorar js's

const scssFile = 'src/scss/**/*.scss';
const imgFiles = 'src/img/**/*.{png,jpg}';
const jsFiles = 'src/js/**/*.js';

function css(done) {
    src(scssFile)
        .pipe(sourcemaps.init())
        .pipe( plumber() )
        .pipe( sass() )
        .pipe( postcss( [autoprefixer(), cssnano()] ) )
        .pipe(sourcemaps.write('.'))
        .pipe( dest('build/css') )
    done();
}

function sassWatcher( done ) {
    watch(scssFile, css);
    done();
}

function imgToWebp(done) {
    const opt = {
        quality: 50
    };

    src(imgFiles)
        .pipe( webp(opt) )
        .pipe( dest('build/img') )
    done();
}

function optimizeImg(done) {
    const opt = {
        optimizationLevel: 3
    };
    src(imgFiles)
        .pipe( cache(imagemin(opt)) )
        .pipe( dest('build/img') )
    done();
}

function imgToAvif(done) {
    const opt = {
        quality: 50
    };

    src(imgFiles)
        .pipe( avif(opt) )
        .pipe( dest('build/img') )
    done();
}

function javascript( done ) {
    src(jsFiles)
        .pipe( sourcemaps.init())
        .pipe( terser() )
        .pipe( sourcemaps.write('.'))
        .pipe( dest('build/js') );
    done();
}

function jsWatcher( done ) {
    watch(jsFiles, javascript);
    done();
}

exports.css = css;
exports.js = javascript;
exports.webconv = imgToWebp;
exports.avif = imgToAvif;
exports.optimizeimg = optimizeImg;

exports.imgconversions = parallel(imgToAvif, imgToWebp, optimizeImg);
exports.sasscomp = parallel(jsWatcher, sassWatcher);