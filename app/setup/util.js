/*eslint-env node*/

(function () {

    'use strict';

    /**
     * Export the generator name
     * @method  extractGeneratorName
     * @param  {Object} _       Lodash
     * @param  {String} appname App name
     * @return {String}         Slugged generator
     */
    function extractGeneratorName(_, appname) {

        var slugged = _.slugify(appname),
            match = slugged.match(/^generator-(.+)/);

        if (match && match.length === 2) {
            return match[1].toLowerCase();
        }

        return slugged;
    }

    module.export = {
        extractGeneratorName: extractGeneratorName
    };

}());