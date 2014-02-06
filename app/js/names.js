var names = {
    abbreviate: function(name) {

        function getRemovalAbbreviations() {
            return _.map(
                [/^Upplands /, /^Stockholms /, /^T-/, /amn$/, /entrum$/],
                function(removal) {
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
    },

    get: function(id) {
        var name = {
            '9530': 'Södra',
            '9531': 'Årstaberg',
            '9529': 'Älvsjö',
            '9528': 'Stuvsta',
            '9527': 'Huddinge',
            '9526': 'Flemingsberg',
            '9525': 'Tullinge',
            '9523': 'Rönninge'
        };
        return name[id] || id;
    }
};
