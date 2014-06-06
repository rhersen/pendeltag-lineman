describe 'abbreviate', ->
    beforeEach( -> $('<div id="jasmine_content"></div>').appendTo('body'))

    it 'should abbreviate centrum', ->
        expect(abbreviate('Södertälje centrum')).toBe 'Södertälje c'

    it 'should abbreviate hamn', ->
        expect(abbreviate('Södertälje hamn')).toBe 'Södertälje h'

    it 'should abbreviate Väster', ->
        expect(abbreviate('Västerhaninge')).toBe 'V‧haninge'

    it 'should remove Upplands', ->
        expect(abbreviate('Upplands Väsby')).toBe 'Väsby'

    it 'should remove Stockholms', ->
        expect(abbreviate('Stockholms södra')).toBe 'södra'

    it 'should remove T-', ->
        expect(abbreviate('T-Centralen')).toBe 'Centralen'

    it 'should remove strand', ->
        expect(abbreviate('Farsta strand')).toBe 'Farsta'

    it 'should perform multiple abbreviations', ->
        expect(abbreviate('Upplands hamn')).toBe 'h'
