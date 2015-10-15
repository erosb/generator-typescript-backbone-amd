requirejs.config({
  shim: {
    'jasmine-html': {
      deps: [
        'jasmine-core'
      ]
    },
    'jasmine-boot': {
      deps: [
        'jasmine-core',
        'jasmine-html'
      ]
    }
  },
  paths: {
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/underscore/underscore',
    jquery: '../bower_components/jquery/dist/jquery',
    requirejs: '../bower_components/requirejs/require',
    text: '../bower_components/text/text',
    'jasmine-core': '../bower_components/jasmine-core/lib/jasmine-core/jasmine',
    'jasmine-html': '../bower_components/jasmine-core/lib/jasmine-core/jasmine-html',
    'jasmine-boot': '../bower_components/jasmine-core/lib/jasmine-core/boot',
    handlebars: '../bower_components/handlebars/handlebars'
  },
  packages: [

  ]
});

define([document.getElementsByTagName("script")[0].getAttribute("data-bootstrap")], function(bootstrap) {
	bootstrap();
});

