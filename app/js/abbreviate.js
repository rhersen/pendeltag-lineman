function abbreviate(name) {
    var removals = [/^Upplands /, /^Stockholms /, /^T-/, /amn$/, /yd$/, /entrum$/, /\sstrand$/];

    var replacements = [
        {
            pattern: /^Väster/,
            replacement: 'V‧'
        }, {
            pattern: /ral$/,
            replacement: 'ralen'
        }
    ];

    var r = replacements.concat(getRemovalAbbreviations()).reduce(replace, name);

    return r.slice(0, 1).toUpperCase() + r.slice(1);

    function getRemovalAbbreviations() {
        return removals.map(function (removal) {
            return {
                pattern: removal,
                replacement: ''
            };
        });
    }

    function replace(name, abbreviation) {
        return name.replace(abbreviation.pattern, abbreviation.replacement);
    }
}
