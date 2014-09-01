node-internRequirements
=======================

internal requirements manager. Require internal files the easy way!

Install via npm
---------------
```
npm install intern-requirements
```

Usage
-------
First you need a ```dependencies.json``` file on the working directory of the node process.
```json
{
  "foo" : "modules/foo.js",
  "bar" : "modules/bar/index.json"
}
```

In this example we registered two internal dependencies. ```Foo``` with
the file path ```modules/foo.js``` and ```bar```with ```modules/bar/index.json```.
These path definitions are relative current working directory. (```process.cwd()```)

After that you can require the internal modules via
```javascript
require("intern-requirements")("Foo")
```

### Alternative ```dependencies.json``` location
By default inter-requirements expects the ```dependencies.json``` file in the current working directory.
If you need to execute your code from another directory you can define a relative path starting from the current
working directory to your custom ```dependencies.json```file by defining the environment variable ```REL_DEP_LOC```.
For example:
```
REL_DEP_LOC="src" node src/main.js
```

### Environment Settings
If you need to, you can define modules depending on the ```NODE_ENV```. Just define a ```ENV``` Object inside of your ```dependency.json```
```json
{
  "foo" : "modules/foo.js",
  "bar" : "modules/bar/index.json",
  "ENV" : {
    "test" : {
      "foo" : "modules/foo-dev.js"
    }
  }
}
```

### Require node modules
You can require node modules as an alternative to the file requirement.
```json
{
  "mocha" : {
    "require": "mocha"
  },
  "mochaRunner" : {
    "require": "mocha/lib/runner"
  }
}
```

Changelog
---------
0.0.6
-  add require module functionality

License
-------
Unless stated elsewhere, file headers or otherwise, the license as stated in the LICENSE file.
