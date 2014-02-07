describe 'Expiry', ->
    subject = undefined

    beforeEach(->
        $('<div id="jasmine_content"></div>').appendTo('body'))

    it 'calculates time since request', ->
        subject = Expiry
            requestTime: 1322152747147
        jasmineReact.renderComponent(subject)
        expect(subject.getTimeSinceRequest(1322152807741)).toBe(60.594)

    describe 'isPending', ->
        it 'true if request is newer than response', ->
            subject = Station()
            jasmineReact.renderComponent(subject)
            subject.setState
                requestTime: 2000
                responseTime: 1000
            expect(subject.isPending()).toBeTruthy()

        it 'false if request is older than response', ->
            subject = Station()
            jasmineReact.renderComponent(subject)
            subject.setState
                requestTime: 2000
                responseTime: 3000
            expect(subject.isPending()).toBeFalsy()

        it 'true if response is undefined', ->
            subject = Station()
            jasmineReact.renderComponent(subject)
            subject.setState
                requestTime: 2000
            expect(subject.isPending()).toBeTruthy()

        it 'false if both request and response are undefined', ->
            subject = Station()
            jasmineReact.renderComponent(subject)
            expect(subject.isPending()).toBeFalsy()

    describe 'isExpired', ->
        it 'is false if response are undefined', ->
            subject = Station()
            jasmineReact.renderComponent(subject)
            subject.setState
                now: 92000
            expect(subject.isExpired()).toBeFalsy()

        it 'is true if response is older than the limit', ->
            subject = Station()
            jasmineReact.renderComponent(subject)
            subject.setState
                now: 92000
                responseTime: 3000
            expect(subject.isExpired()).toBeTruthy()

        it 'is false if request is newer than response', ->
            subject = Station()
            jasmineReact.renderComponent(subject)
            subject.setState
                now: 92000
                requestTime: 2000
                responseTime: 1000
            expect(subject.isExpired()).toBeFalsy()

    it 'is empty if request is undefined', ->
        subject = Expiry {}
        result = jasmineReact.renderComponent(subject)
        expect(result._renderedComponent.props.children).toBeUndefined()

    it 'should calculate difference in seconds', ->
        subject = Expiry {}
        expect(subject.diff(3333, 1000).toString()).toBe '2.333'
        expect(subject.diff(3133, 1000).toString()).toBe '2.133'
