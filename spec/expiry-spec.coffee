describe 'Expiry', ->
    subject = undefined

    beforeEach(->
        $('<div id="jasmine_content"></div>').appendTo('body')
        subject = Expiry()
        jasmineReact.renderComponent(subject))

    it 'calculates time since request', ->
        subject.setState({requestTime: 1322152747147})
        expect(subject.getTimeSinceRequest(1322152807741)).toBe(60.594)

    it 'is pending if request is newer than response', ->
        subject.setState({requestTime: 2000, responseTime: 1000})
        expect(subject.isPending()).toBe(true)

    it 'is not pending if request is older than response', ->
        subject.setState({requestTime: 2000, responseTime: 3000})
        expect(subject.isPending()).toBe(false)

    it 'is pending if response is undefined', ->
        subject.setState({requestTime: 2000})
        expect(subject.isPending()).toBe(true)

    it 'is pending if neither request nor response is defined', ->
        subject.setState({requestTime: 2000})
        expect(subject.isPending()).toBe(true)
