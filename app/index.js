/*eslint-env node*/

(function () {

    'use strict';

    var util = require('util'),
        yeoman = require('yeoman-generator');

    function Alchemy(args, options) {

        var path = require('path');

        yeoman.generators.Base.apply(this, arguments);

        this.on('end', function () {
            this.installDependencies({
                skipInstall: options['skip-install'],
                skipMessage: options['skip-install-message']
            });
        });

        this.pkg = JSON.parse(this.readFileAsString(
                path.join(__dirname, '../package.json')));

    }

    util.inherits(Alchemy, yeoman.generators.Base);

    Alchemy.prototype.prompt = require('setup/prompt.js');
    Alchemy.prototype.html = require('setup/prompt.js');
    Alchemy.prototype.scripts = require('setup/scripts.js');
    Alchemy.prototype.styles = require('setup/styles.js');
    Alchemy.prototype.dotfiles = require('setup/dotfiles.js');

    module.exports = Alchemy;

}());