describe 'Station', ->
  subject = undefined

  beforeEach(->
    $('<div id="jasmine_content"></div>').appendTo('body'))

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

  describe 'responseReceived', ->
    it 'sets state according to response', ->
      subject = Station()
      jasmineReact.renderComponent(subject)
      subject.responseReceived
        SiteId: '9525',
        StopAreaName: 'Tullinge',
        trains: [
          Destination: 'Centralen'
          ExpectedDateTime: ''
        ]
      (expect subject.state.trains).toEqual jasmine.any Array
      (expect subject.state.responseTime).toEqual jasmine.any Number
      (expect subject.state.current).toBe 9525
      (expect subject.state.StopAreaName).toBe 'Tullinge'