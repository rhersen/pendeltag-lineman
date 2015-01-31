describe 'TableRow', ->
    subject = undefined
    beforeEach(->
        $('<div id="jasmine_content"></div>').appendTo('body')
        c = TableRow
          train: {Destination: '', ExpectedDateTime: ''}
          now: new Date('2013-01-02T13:37:00')
        subject = jasmineReact.renderComponent(c)
    )

    it 'should return hour and minute if seconds are zero', ->
        expect(subject.getTime('2013-01-02T13:37:00')).toBe '13:37'

    it 'should return seconds too if non-zero', ->
        expect(subject.getTime('2013-01-02T13:37:17')).toBe '13:37:17'

    it 'should return input if non-parseable', ->
        expect(subject.getTime('lEET')).toBe 'lEET'
