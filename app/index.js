/*jshint node:true*/

(function (global, undefined) {

    'use strict';

    var util = require('util'),
        path = require('path'),
        yeoman = require('yeoman-generator'),
        AlchemyGenerator;

    function extractGeneratorName(_, appname) {
        var slugged = _.slugify(appname),
            match = slugged.match(/^generator-(.+)/);

        if (match && match.length === 2) {
            return match[1].toLowerCase();
        }

        return slugged;
    }

    AlchemyGenerator = function AlchemyGenerator(args, options) {

        yeoman.generators.Base.apply(this, arguments);

        this.on('end', function () {
            this.installDependencies({
                skipInstall: options['skip-install'],
                skipMessage: options['skip-install-message']
            });
        });

        this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname,
                '../package.json')));
    };

    util.inherits(AlchemyGenerator, yeoman.generators.Base);

    AlchemyGenerator.prototype.askFor = function askFor() {
        
        var prompts = [],
            cb = this.async();

        // have Yeoman greet the user.
        if (!this.options['skip-welcome-message']) {
            console.log(this.yeoman);
            console.log(this.pkg.description + '\n');
        }

        prompts.push({
            name: 'projName',
            message: 'What\'s your project name?',
            default: extractGeneratorName(this._, this.appname)
        });

        prompts.push({
            name: 'projAuthor',
            message: 'Who\'s the author?',
            default: this.user.git.username
        });

        // options
        prompts.push({
            type: 'checkbox',
            name: 'features',
            message: 'What more would you like?',
            choices: [{
                name: 'jQuery',
                value: 'includejQuery',
                checked: false
            }, {
                name: 'Zepto',
                value: 'includeZepto',
                checked: false
            }]
        });

        this.prompt(prompts, function (props) {

            var generator = this,
                DEFAULTS = {
                    'projName': props.projName,
                    'projAuthor': props.projAuthor,
                    'projVersion': '0.1.0',
                    'projDescription': 'My quick start project',
                    'projUrl': '',
                    'projRepository': '',
                    'projSource': 'src',
                    'projDist': 'build'
                },
                key;

            for (key in DEFAULTS) {
                if (DEFAULTS.hasOwnProperty(key)) {
                    generator[key] = DEFAULTS[key];
                }
            }

            // get features
            this.includejQuery = false;
            this.includeZepto = false;
            props.features.forEach(function (element) {
                generator[element] = true;
            });

            cb();

        }.bind(this));

    };

    AlchemyGenerator.prototype.app = function app() {

        // setup files
        this.template('_package.json', 'package.json');
        this.template('_bower.json', 'bower.json');
        this.template('_GruntFile.js', 'GruntFile.js');
        this.template('_README.md', 'README.md');

        // content
        this.template('_index.html', this.projSource + '/index.html');
        this.template('_404.html', this.projSource + '/404.html');
        this.template('_robots.txt', this.projSource + '/robots.txt');
        this.template('_humans.txt', this.projSource + '/humans.txt');
        this.template('_crossdomain.xml', this.projSource + '/crossdomain.xml');
    };

    AlchemyGenerator.prototype.folders = function folders() {
        this.mkdir(this.projSource);
        this.mkdir(this.projSource + '/scripts');
        this.mkdir(this.projSource + '/styles');
        this.mkdir(this.projSource + '/bin');
    };

    AlchemyGenerator.prototype.resources = function scripts() {
        this.copy('scripts/_main.js', this.projSource + '/scripts/main.js');
        this.template('styles/styles.css', this.projSource +
                '/styles/styles.css');
    };

    AlchemyGenerator.prototype.dotfiles = function dotfiles() {

        var files = [
                'bowerrc',
                'editorconfig',
                'gitignore',
                'jsbeatifyrc',
                'jscsrc',
                'jshintrc',
                'npmignore'
            ],
            ln = files.length;

        while(ln--) {
            this.template(files[ln], '.' + files[ln]);
        }

    };

    // export
    module.exports = AlchemyGenerator;

}(this));
