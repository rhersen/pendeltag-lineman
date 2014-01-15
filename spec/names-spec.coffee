describe 'names', ->
    beforeEach( -> $('<div id="jasmine_content"></div>').appendTo('body'))

    it 'should abbreviate centrum', ->
        expect(names.abbreviate('Södertälje centrum')).toBe 'Södertälje c'

    it 'should abbreviate hamn', ->
        expect(names.abbreviate('Södertälje hamn')).toBe 'Södertälje h'

    it 'should abbreviate Väster', ->
        expect(names.abbreviate('Västerhaninge')).toBe 'V‧haninge'

    it 'should abbreviate Flemings', ->
        expect(names.abbreviate('Flemingsberg')).toBe 'F‧berg'

    it 'should remove Upplands', ->
        expect(names.abbreviate('Upplands Väsby')).toBe 'Väsby'

    it 'should remove Stockholms', ->
        expect(names.abbreviate('Stockholms södra')).toBe 'södra'

    it 'should remove T-', ->
        expect(names.abbreviate('T-Centralen')).toBe 'Centralen'

    it 'should perform multiple abbreviations', ->
        expect(names.abbreviate('Upplands hamn')).toBe 'h'
