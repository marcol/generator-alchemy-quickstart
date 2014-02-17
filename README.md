# generator-alchemy-quickstart [![Build Status](https://secure.travis-ci.org/marcol/generator-alchemy-quickstart.png?branch=master)](https://travis-ci.org/marcol/generator-alchemy-quickstart)


## Getting Started

### What is Alchemy QuickStart?

Alchemy QuickStart is an [Yeoman](http://yeoman.io) generator for quick projects or testing with all the HTML5 and ES5 polyfills. jQuery or Zepto are optional resources.

### Install

To install Alchemy generator you need NPM and Yeoman. To install Yeoman you just need to this:

```
$ npm install -g yo
```

To install generator-alchemy from npm, run:

```
$ npm install -g generator-alchemy-quickstart
```

Now you just need to create the folder where you going to place your project and initiate the generator:

```
$ yo alchemy-quickstart
```

Follow the instructions and choose the dependencies as you wish... and you are done!


## Basic Features

### HTML5 and ES5 Polyfills
HTML5 and ES5 polyfills form https://github.com/remy/polyfills by Remy Sharp

### Grunt Tasks

#### grunt

 * Runs JSHint against the JavaScript implemented code

#### grunt serve

 * Clean server folder (.tmp)
 * Start the connect server with livereload
 * Start watching files:
  * Reloads the webpage on any resource change

## Optional Features

### jQuery
Includes jQuery as one of the resources dependency.

### Zepto
Includes Zepto as one of the resources dependency.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
