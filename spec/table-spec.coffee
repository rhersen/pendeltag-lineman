describe 'TableRow', ->
    beforeEach(->
        $('<div id="jasmine_content"></div>').appendTo('body'))

    it 'should return hour and minute if seconds are zero', ->
        subject = TableRow()
        expect(subject.getTime('2013-01-02T13:37:00')).toBe '13:37'

    it 'should return seconds too if non-zero', ->
        subject = TableRow()
        expect(subject.getTime('2013-01-02T13:37:17')).toBe '13:37:17'

    it 'should return input if non-parseable', ->
        subject = TableRow()
        expect(subject.getTime('lEET')).toBe 'lEET'
