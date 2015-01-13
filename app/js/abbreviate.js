function abbreviate(name) {
    return _.compose.apply(this, [capitalize].concat(replacements(), removals()))(name);

    function capitalize(r) {
        return r.slice(0, 1).toUpperCase() + r.slice(1);
    }

    function replacements() {
        return _.map(
            [
                {pattern: /^Väster/, replacement: 'V‧'},
                {pattern: /ral$/, replacement: 'ralen'}
            ],
            getReplacementAbbreviation);
    }

    function removals() {
        return _.map(
            [/^Upplands /, /^Stockholms /, /^T-/, /amn$/, /yd$/, /entrum$/, /\sstrand$/],
            getRemovalAbbreviation);
    }

    function getReplacementAbbreviation(abbreviation) {
        return function (name) {
            return name.replace(abbreviation.pattern, abbreviation.replacement);
        };
    }

    function getRemovalAbbreviation(removal) {
        return function (name) {
            return name.replace(removal, '');
        };
    }
}
