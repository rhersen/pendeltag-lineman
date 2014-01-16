describe 'Expiry', ->
    subject = undefined

    beforeEach(->
        $('<div id="jasmine_content"></div>').appendTo('body'))

    it 'calculates time since request', ->
        subject = Expiry({requestTime: 1322152747147})
        jasmineReact.renderComponent(subject)
        expect(subject.getTimeSinceRequest(1322152807741)).toBe(60.594)

    it 'is pending if request is newer than response', ->
        subject = Expiry({requestTime: 2000, responseTime: 1000})
        jasmineReact.renderComponent(subject)
        expect(subject.isPending()).toBe(true)

    it 'is not pending if request is older than response', ->
        subject = Expiry({requestTime: 2000, responseTime: 3000})
        jasmineReact.renderComponent(subject)
        expect(subject.isPending()).toBe(false)

    it 'is pending if response is undefined', ->
        subject = Expiry({requestTime: 2000})
        jasmineReact.renderComponent(subject)
        expect(subject.isPending()).toBe(true)

    it 'is empty if request is undefined', ->
        subject = Expiry({})
        result = jasmineReact.renderComponent(subject)
        expect(result._renderedComponent.props.children).toBeUndefined()
