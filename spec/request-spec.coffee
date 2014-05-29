describe 'getRequestSender', ->
  ajax = null
  reactRoot = null

  send = (responseText) ->
    ->
      @readyState = 4
      @status = 200
      @responseText = responseText
      @onreadystatechange()

  beforeEach ->
    affix('div#jasmine_content')
    reactRoot =
      setState: ->

  describe 'with data', ->
    beforeEach ->
      ajax =
        open: ->
        send: send '[{"SiteId": 9525, "StopAreaName": "Tullinge"}]'

    it 'calls open', ->
      spyOn ajax, 'open'
      (getRequestSender ajax, reactRoot)(9525)
      ((expect ajax.open).toHaveBeenCalledWith 'GET', '/departures/9525', true)

    it 'invokes callback', ->
      spyOn reactRoot, 'setState'
      (getRequestSender ajax, reactRoot)()
      (expect reactRoot.setState).toHaveBeenCalledWith
        responseTime: jasmine.any Number
        current: 9525
        StopAreaName: 'Tullinge'
        trains: jasmine.any Array

  describe 'without data', ->
    beforeEach ->
      ajax =
        open: ->
        send: send '[]'

    it 'invokes callback', ->
      spyOn reactRoot, 'setState'
      (getRequestSender ajax, reactRoot)()
      (expect reactRoot.setState).toHaveBeenCalledWith
        responseTime: jasmine.any Number
        current: jasmine.any Number
        StopAreaName: ''
        trains: []