var generators = require("yeoman-generator");
var init = require("init-package-json");
var path = require("path");
var fs = require("fs");

module.exports = generators.Base.extend({

  constructor: function() {
    generators.Base.apply(this, arguments);
  },
  initNpmPackage: function() {
    var onComplete = this.async();
    var packageJsonPath = this.destinationPath("package.json");
    var packageExists = fs.existsSync(packageJsonPath);
    if (packageExists) {
      console.log("existing package.json found: " + packageJsonPath);
      var _onPackageJsonCreated = this._onPackageJsonCreated.bind(this);
      fs.readFile(packageJsonPath, function(err, json) {
        var packageContents;
        if (!err) {
          packageContents = JSON.parse(json);
        }
        _onPackageJsonCreated(err, packageContents, onComplete);
      });
    } else {
      console.log("Initializing npm package...");
      var initFile = path.resolve(process.env.HOME, ".npm-init");
      init(this.destinationPath(""), initFile, {}, function(err, data) {
        this._onPackageJsonCreated(err, data, onComplete);
      }.bind(this));
    }
  },
  _onPackageJsonCreated: function(err, generatedPackageJson, onComplete) {
    if (err) throw err;
    var templatePackageJsonPath = this.templatePath("package.json");
    var destPackageJsonPath = this.destinationPath("package.json");
    var templateBowerJsonPath = this.templatePath("bower.json");
    var destBowerJsonPath = this.destinationPath("bower.json");
    var templateJson = JSON.parse(fs.readFileSync(templatePackageJsonPath));
    generatedPackageJson.devDependencies = templateJson.devDependencies;
    fs.writeFile(destPackageJsonPath, JSON.stringify(generatedPackageJson, null, 2));
    console.log("creating bower.json based on package.json");
    var bowerConfigPatch = {
      name: generatedPackageJson.name,
      description: generatedPackageJson.description,
      authors: [generatedPackageJson.author],
      moduleType: ["amd"],
      license: generatedPackageJson.license,
      version: generatedPackageJson.version
    };
    var templateBowerConfig = JSON.parse(fs.readFileSync(templateBowerJsonPath));
    for (var key in bowerConfigPatch) {
      templateBowerConfig[key] = bowerConfigPatch[key];
    }
    fs.writeFile(destBowerJsonPath, JSON.stringify(templateBowerConfig, null, 2));
    onComplete();
  },
  copyDefaultFiles: function() {
    var toBeCopied = [
      "index.html",
      "test.html",
      "tsd.json",
      "gulpfile.js",
      ".bowerrc",
      "gulpfile.js",
      "tsconfig.json",
      "js"
    ];
    for (var i in toBeCopied) {
      this.fs.copyTpl(this.templatePath(toBeCopied[i]), this.destinationPath(toBeCopied[i]));
    }
    this.fs.copyTpl(this.templatePath("gitignore"), this.destinationPath(".gitignore"));
  },
  copySampleSources: function() {
    var onComplete = this.async();
    this.prompt({
      name: "copySources",
      type: "confirm",
      message: "Do you want to add sample typescript source files?"
    }, function(answer) {
      if (!answer.copySources) {
        this.fs.copyTpl(this.templatePath("empty-src"), this.destinationPath("src"));
      } else {
        this.fs.copyTpl(this.templatePath("src"), this.destinationPath("src"));
      }
      onComplete();
    }.bind(this));
  },
  _printNextSteps: function() {
    console.log("Project skeleton generated. Now run the following commands:");
    console.log("	npm install");
    console.log("	bower install");
    console.log("	tsd reinstall");
  }
});
