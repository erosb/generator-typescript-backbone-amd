var generators = require("yeoman-generator");
var init = require("init-package-json");
var path = require("path");
var fs = require("fs");

module.exports = generators.Base.extend({
	
	constructor: function() {
		generators.Base.apply(this, arguments);
	},
	initNpmPackage: function() {
		var initFile = path.resolve(process.env.HOME, ".npm-init");
		init(this.destinationPath(""), initFile, {}, this._onPackageJsonCreated.bind(this));
	},
	_onPackageJsonCreated : function(err, generatedPackageJson) {
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
			description : generatedPackageJson.description,
			authors : [generatedPackageJson.author],
			moduleType : ["amd"],
			license : generatedPackageJson.license,
			version : generatedPackageJson.version
		};
		var templateBowerConfig = JSON.parse(fs.readFileSync(templateBowerJsonPath));
		for (var key in bowerConfigPatch) {
			templateBowerConfig[key] = bowerConfigPatch[key];
		}
		fs.writeFile(destBowerJsonPath, JSON.stringify(templateBowerConfig, null, 2));	
	},
	copySources : function() {
		this.fs.copyTpl(
			this.templatePath("*.html"),
			this.destinationPath("")
		);
		this.fs.copyTpl(
			this.templatePath(".gitignore"),
			this.destinationPath(".gitignore")
		);
		this.fs.copyTpl(
			this.templatePath("tsd.json"),
			this.destinationPath("tsd.json")
		);
	}
		
});
