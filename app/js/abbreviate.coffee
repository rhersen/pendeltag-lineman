getRemovalAbbreviations = () ->
  [
    /^Upplands /
    /^Stockholms /
    /^T-/
    /amn$/
    /entrum$/
    /\sstrand$/
  ].map (removal) ->
    pattern: removal
    replacement: ''

replace = (name, abbreviation) ->
  name.replace abbreviation.pattern, abbreviation.replacement

window.abbreviate = (name) ->
  replacements = [
    { pattern: /^Väster/, replacement: 'V‧' }
    { pattern: /ral$/, replacement: 'ralen' }
  ]

  r = replacements.concat(getRemovalAbbreviations()).reduce replace, name
  r.slice(0, 1).toUpperCase() + r.slice 1
