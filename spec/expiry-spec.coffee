describe 'Expiry', ->
    subject = undefined

    beforeEach(->
        $('<div id="jasmine_content"></div>').appendTo('body'))

    it 'calculates time since request', ->
        subject = Expiry
            requestTime: 1322152747147
            now: new Date(1322152807741)
        jasmineReact.renderComponent(subject)
        expect(subject.getTimeSinceRequest(1322152807741)).toBe(60.594)

    it 'renders time since request/response', ->
        subject = Expiry
          requestTime: 1322152747147
          responseTime: 1322152748147
          now: new Date(1322152749247)
        result = jasmineReact.renderComponent subject
        expect(result._renderedComponent.props.children).toBe '2.1/1.1'

    it 'renders time since request', ->
        subject = Expiry
          requestTime: 1322152747147
          now: new Date(1322152749247)
        result = jasmineReact.renderComponent subject
        expect(result._renderedComponent.props.children).toBe '2.1'

    it 'is empty if request is undefined', ->
        subject = Expiry {}
        result = jasmineReact.renderComponent subject
        expect(result._renderedComponent.props.children).toBeUndefined()

    it 'should calculate difference in seconds', ->
        subject = Expiry {}
        expect(subject.diff(3333, 1000).toString()).toBe '2.333'
        expect(subject.diff(3133, 1000).toString()).toBe '2.133'
