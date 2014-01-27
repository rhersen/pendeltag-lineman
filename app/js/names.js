var names = {
    abbreviate: function (name) {

        function getRemovalAbbreviations() {
            return _.map(
                [/^Upplands /, /^Stockholms /, /^T-/, /amn$/, /entrum$/],
                function (removal) {
                    return {pattern: removal, replacement: ''};
                }
            );
        }

        function replace(name, abbreviation) {
            return name.replace(abbreviation.pattern, abbreviation.replacement);
        }

        var abbreviations = [
            {pattern: /^Väster/, replacement: 'V‧'},
            {pattern: /^Flemings/, replacement: 'F‧'},
            {pattern: /[öÖ]/, replacement: 'O'},
            {pattern: /[åÅäÄ]/, replacement: 'A'}
        ];

        return _.reduce(abbreviations.concat(getRemovalAbbreviations()), replace, name).toUpperCase();
    }
};
