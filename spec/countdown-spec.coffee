describe 'Countdown', ->
    beforeEach( -> affix('div#jasmine_content'))

    it 'should handle less than one minute', ->
        subject = Countdown({dateTime: "2013-01-02T17:41:00", now: new Date(1322152807741)})
        result = jasmineReact.renderComponent(subject)
        expect(result._renderedComponent.props.children).toBe '0:52.2'

    it 'should handle less than two minutes', ->
        subject = Countdown({dateTime: "2013-01-02T17:41:00", now: new Date(1322152747147)})
        result = jasmineReact.renderComponent(subject)
        expect(result._renderedComponent.props.children).toBe '1:52.8'

    it 'should round tenths to zero', ->
        subject = Countdown({dateTime: "2013-01-02T17:41:00", now: new Date(1322152747000)})
        result = jasmineReact.renderComponent(subject)
        expect(result._renderedComponent.props.children).toBe '1:53.0'

    it 'should handle departures next hour', ->
        subject = Countdown({dateTime: "2013-01-02T18:01:00", now: new Date(1322152747000)})
        result = jasmineReact.renderComponent(subject)
        expect(result._renderedComponent.props.children).toBe '21:53.0'

    it 'should handle departures far into next hour', ->
        subject = Countdown({dateTime: "2013-01-02T18:39:00", now: new Date(1322153707000)})
        result = jasmineReact.renderComponent(subject)
        expect(result._renderedComponent.props.children).toBe '43:53.0'

    it 'should handle train that has just departed', ->
        date = new Date(1322152860100)
        date.getTimezoneOffset = -> return -60
        subject = Countdown({dateTime: "2013-01-02T17:41:00", now: date})
        result = jasmineReact.renderComponent(subject)
        expect(result._renderedComponent.props.children).toBe '-0:00.1'

    it 'should handle train that departed a minute ago', ->
        date = new Date(1322152860100)
        date.getTimezoneOffset = -> return -60
        subject = Countdown({dateTime: "2013-01-02T17:40:00", now: date})
        result = jasmineReact.renderComponent(subject)
        expect(result._renderedComponent.props.children).toBe '-1:00.1'

    it 'should handle departures almost an hour from now', ->
        subject = Countdown({dateTime: "2013-01-02T18:40:00", now: new Date(1322152860100)})
        result = jasmineReact.renderComponent(subject)
        expect(result._renderedComponent.props.children).toBe '58:59.9'

    it 'should handle train that departs exactly now', ->
        subject = Countdown({dateTime: "2013-01-02T17:41:00", now: new Date(1322152860000)})
        result = jasmineReact.renderComponent(subject)
        expect(result._renderedComponent.props.children).toBe '0:00.0'
