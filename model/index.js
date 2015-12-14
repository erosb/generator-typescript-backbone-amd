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
      templateParams = {
        properties : []
      };
      this.prompt({
        type : "input",
        message : "name of the model",
        name : "className"
      }, function(answer) {
        templateParams.className = answer.className;
        this._readProperties(function(propertyList) {
          templateParams.propertyList = propertyList;
          this.fs.copyTpl(
            this.templatePath("model.ts"),
            this.destinationPath("src/model/" + answer.className + ".ts"),
            templateParams
          );
          this.modelClassName = answer.className;
          onComplete();
        }.bind(this));
      }.bind(this));
  },
  _readProperties : function(onComplete) {
   this.prompt({
      type : "confirm",
      name : "addProp",
      message : this.propertyList ? "add another property?" : "add property?"
   }, function(answer) {
        if (answer.addProp) {
          this.prompt([
            {
              type : "input",
              name : "propName",
              message : "property name"
            },
            {
              type : "input",
              name : "propType",
              message : "property type",
              default : "string"
            }
          ],
          function(answer) {
            if (!this.propertyList) {
              this.propertyList = [];
            }
            this.propertyList.push(answer);
            this._readProperties(onComplete);
          }.bind(this));
     } else {
       onComplete(this.propertyList || []);
     }
   }.bind(this));
  },
  copyTest : function() {
	  this.prompt({
		 type : "confirm",
		 name : "generateTest",
		 message : "Do you want to generate a jasmine test?" 
      }, function(answer) {
		if (answer.generateTest) {
			var testClassName = this.modelClassName + "Test";
			var testFileName = testClassName + ".ts" ;
			var templateParams = {
				sutClassName : this.modelClassName,
				testClassName : testClassName
			}
			this.fs.copyTpl(
				this.templatePath("test.ts"),
				this.destinationPath("src/tests/model/" + testFileName),
				templateParams
			);
		}  
	  }.bind(this));
  }
});
