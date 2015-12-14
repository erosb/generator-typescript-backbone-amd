var generators = require("yeoman-generator");
var init = require("init-package-json");
var path = require("path");
var fs = require("fs");

module.exports = generators.Base.extend({

  constructor: function() {
    generators.Base.apply(this, arguments);
  },
  readClassName : function() {
	var onComplete = this.async();
	this.prompt([
	  {
	    type : "input",
	    message : "name of the view",
	    name : "className"
	  },
	  {
		type : "confirm",
		message : "add html template?",
		name : "addTemplate"  
	  },
	  {
		type : "input",
		message: "represented model class?",
		name : "modelClassName"  
	  }
	], function(answer) {
	  if (!this.fs.exists(this.destinationPath("src/model/" + answer.modelClassName + ".ts"))) {
	    console.warn("warning: model class " + answer.modelClassName + " does not exist");
	  }
	  var templatePath = answer.addTemplate ? "text!../template/" + answer.className + ".html" : null;
	  var viewTemplateParams = {
		className : answer.className,
		modelClassName : answer.modelClassName,
		modelPath : "../model/" + answer.modelClassName,
		templatePath : templatePath
	  };
	  this.fs.copyTpl(this.templatePath("view.ts"), this.destinationPath("src/view/" + answer.className + ".ts"), viewTemplateParams);
	  this.fs.copyTpl(this.templatePath("template.html"), this.destinationPath("src/template/" + answer.className + ".html"), viewTemplateParams);
	  onComplete();
	}.bind(this));  
  }
});
