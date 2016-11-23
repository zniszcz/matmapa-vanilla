'use strict';

module.exports = {
  glob: {
    scss:  './src/**/*.scss',
    js: './src/**/*.js',
    html: './src/**/*.html',
  },
  entryPoint: {
    scss: './src/index.scss'
  },
  path: {
    css: './dist/css/',
    js: './dist/js/',
    dist: './dist/',
  },
  concatOrder: {
    js: [
        './src/bootstrap.js',
        './src/lib/abstract.js',
        './src/lib/Abstract/Observable.js',
        './src/lib/Abstract/Model.js',
        './src/lib/Abstract/View.js',
        './src/lib/Abstract/Controller.js',
        './src/lib/Abstract/Repository.js',
        './src/lib/helpers/**/*.js',
        './src/lib/util.js',
        // './src/services/**/*.js',
        './src/**/!(bootstrap).js',
    ]
  },
  assets: {
    js: [
      './node_modules/jquery/dist/jquery.js',
      './node_modules/bootstrap/dist/js/bootstrap.js',
    ],
  },
};
