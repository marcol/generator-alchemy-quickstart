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

        this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
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

            var generator = this;

            this.projName = props.projName;
            this.projAuthor = props.projAuthor;
            this.projVersion = '0.0.1';
            this.projDescription = 'My quick start project';
            this.projUrl = '';
            this.projKeywords = '';
            this.projRepository = '';
            this.projSource = 'app';
            this.projDist = 'dist';

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

        // app folder strcture
        this.mkdir(this.projSource);
        this.mkdir(this.projSource + '/scripts');
        this.mkdir(this.projSource + '/styles');
        this.mkdir(this.projSource + '/bin');

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

    AlchemyGenerator.prototype.scripts = function scripts() {
        this.copy('scripts/_main.js', this.projSource + '/scripts/main.js');
    };

    AlchemyGenerator.prototype.styles = function styles() {
        this.template('styles/styles.css', this.projSource + '/styles/styles.css');
    };

    AlchemyGenerator.prototype.dotfiles = function dotfiles() {
        this.copy('editorconfig', '.editorconfig');
        this.copy('jshintrc', '.jshintrc');
        this.template('bowerrc', '.bowerrc');
    };

    // export
    module.exports = AlchemyGenerator;

}(this));
