Yeoman generator for TypeScript and Backbone with AMD
=====================================================

A TypeScript & Backbone generator for Yeoman.

It consists of the following components:

* typescript (language)
* gulp (build tool)
* bower (package manager)
* backbone (MVC framework)
* requirejs (module loader)
* handlebars (templating)
* jasmine (unit testing)


Prerequisites
-------------

	npm install -g bower
	npm install -g bower-requirejs
	npm install -g gulp
	npm install -g tsd
	npm install -g typescript
	
Installation
------------

	npm install -g yo 
	npm install -g generator-typescript-backbone-amd
	
Usage
-----

You can scaffold your project using the `yo typescript-backbone-amd` command. It will ask a few questions using
`npm-init` then it creates a stub project, just an example for demonstrating the concepts.


Build & run
-----------

If you run the `gulp watch` command then gulp will compile the TypeScript sources, then it will listen for file-change
events and will incrementally recompile your code, which is effective during development. 

You will need a static HTTP server, for example you can use `node-static`. After installing it using `npm install -g node-static`,
you can run it with the `static -c 1 .` . If the server is up and running then point your browser to `http://localhost:8080/index.html` to
see the running application, and you can run the tests at `http://localhost:8080/test.html` . Changing any source files, test files
or template fragments under the `src` directory will be catched, compiled/copied by `gulp`, therefore all you need to do is refreshing
the browser after changing your file.

Whats inside?
-------------

The source files of your application are under the `src/` directory. You will modify never (or just rarely) modify the other files
which are auto-generated by a package manager or used for building the project. The `src/` directory has four subdirectories
(each containing a sample file):

* `main/model/` contains backbone models
* `main/collection/` contains backbone collections
* `main/view/` contains backbone views
* `main/template/` contains HTML template files and they use the Handlebars template engine
* `tests/` contain unit tests using the Jasmine BDD framework

There is also an `src/app.ts` source file, which is used to boot up the application. When you are running `index.html`
from the browser, after requirejs configuration, the `js/app.js` (compiled from `src/app.ts`) will be loaded and executed.

And the rest of the files in the root directory are the followings:

* `js/` contains mostly the javascript files compiled from the typescript sources. The `.ts` files are compiled one-by-one to javascript,
so the directory structure will be the same under `js/` as it is under `src/` (ie. `src/model/UserModel.ts` will be compiled
to `js/model/UserModel.js`).There is no single-file output javascript file (it would slow down compilation to recompile everything
after each file change). There are two exceptions: the `js/config.js` file contains the requirejs configuration and it is modified
by `bower` when you install a new depencency to configure the path (see the `.bowerrc` file for more details); the other is
the `js/test.js` file, which serves a similar purpose as `src/app.ts`, but it boots up jasmine and not the application.
So when you open `http://localhost:8080/test.html` then `js/test.js` will be used. Note: the default `.gitignore` file excludes
everything under the `js/` directory except the `js/config.js` and the `js/test.js` files, so these two are version-controlled.
* `index.html` and `test.html` are the two entry points, as already mentioned above. They are more or less empty, they just
load requirejs in a script tag. You may notice that these files use the same `data-main` attribute, and they also have a `data-bootstrap`
attribute which tells `js/config.js` if `js/app.js` or `js/test.js` should be used. This has been designed this way to avoid the need
for having two separate `config.js` (containing requirejs config) to be updated after `bower install`. 
* `tsd.json` and `typings/` are used by the `tsd` tool for tracking tsd dependencies (this is the default configuration of `tsd`).
* `bower.json` and `bower_components/` are used by the `bower` package manager (this is the default layout for `bower` too)
* `gulpfile.js` is the build script used by `gulp`

