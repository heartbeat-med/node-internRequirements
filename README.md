node-internRequirements
=======================

intern requirements manager. Require intern files the easy way!

Install via NPM
---------------
```
npm install intern-requirements
```

Usage
-------
First you need a ```dependencies.json``` file in the root.
```json
{
  "foo" : "modules/foo.js",
  "bar" : "modules/bar/index.json"
}
```

In this example we registered two intern dependencies. ```Foo``` with
the file path ```modules/foo.js```and ```bar```with ```modules/bar/index.json```.
These path definitions are relative to the root.

After that you can require the intern modules via
```javascript 
require("intern-requirements")("Foo")
```

License
-------
Unless stated elsewhere, file headers or otherwise, the license as stated in the LICENSE file.