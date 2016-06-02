(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'app':                        '/app/', // 'dist',
    'rxjs':                       'rxjs',
    'angular2-in-memory-web-api': 'angular2-in-memory-web-api',
    '@angular':                   '@angular',
    'ng2-bootstrap':              'ng2-bootstrap/ng2-bootstrap.js',
    'immutable':                  'immutable/dist/immutable.js',
    'three':                      'three'
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { defaultExtension: 'js' },
    'ng2-bootstrap':              { defaultExtension: 'js' },
	'three':                      { main: './three_concat.js', defaultExtension: 'js' }
  };
  var packageNames = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/router',
    '@angular/router-deprecated',
    '@angular/testing',
    '@angular/upgrade',
  ];
  // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
  packageNames.forEach(function(pkgName) {
    packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
  });
  var config = {
    baseURL: '/node_modules',
    "defaultJSExtensions": true,

    map: map,
    packages: packages,
    paths: {
      "moment":   "ng2-bootstrap/node_modules/moment/moment"
    },
  }
  System.config(config);
})(this);
