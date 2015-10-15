var generators = require("yeoman-generator");
var init = require("init-package-json");
var path = require("path");
var fs = require("fs");

module.exports = generators.Base.extend({
	
	constructor: function() {
		generators.Base.apply(this, arguments);
	},
	initNpmPackage: function() {
		console.log("Initializing npm package...");
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
		this._printNextSteps();
	},
	copySources : function() {
		var toBeCopied = ["index.html", "test.html",
			".gitignore",
			"tsd.json",
			"gulpfile.js",
			".bowerrc",
			"gulpfile.js",
			"js",
			"src"
		];
		for (var i in toBeCopied) {
			this.fs.copyTpl(this.templatePath(toBeCopied[i]), this.destinationPath(toBeCopied[i]));
		}
	},
	_printNextSteps : function() {
		console.log("Project skeleton generated. Now run the following commands:");
		console.log("	npm install");
		console.log("	bower install");
		console.log("	tsd reinstall");
	}	
});
