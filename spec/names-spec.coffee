describe 'names', ->
    beforeEach( -> $('<div id="jasmine_content"></div>').appendTo('body'))

    it 'should abbreviate centrum', ->
        expect(names.abbreviate('Södertälje centrum')).toBe 'SODERTALJE C'

    it 'should abbreviate hamn', ->
        expect(names.abbreviate('Södertälje hamn')).toBe 'SODERTALJE H'

    it 'should abbreviate Väster', ->
        expect(names.abbreviate('Västerhaninge')).toBe 'V‧HANINGE'

    it 'should abbreviate Flemings', ->
        expect(names.abbreviate('Flemingsberg')).toBe 'F‧BERG'

    it 'should remove Upplands', ->
        expect(names.abbreviate('Upplands Väsby')).toBe 'VASBY'

    it 'should remove Stockholms', ->
        expect(names.abbreviate('Stockholms södra')).toBe 'SODRA'

    it 'should remove T-', ->
        expect(names.abbreviate('T-Centralen')).toBe 'CENTRALEN'

    it 'should perform multiple abbreviations', ->
        expect(names.abbreviate('Upplands hamn')).toBe 'H'
