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
      requestSent: ->
      responseReceived: ->

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
      spyOn reactRoot, 'responseReceived'
      (getRequestSender ajax, reactRoot)()
      (expect reactRoot.responseReceived).toHaveBeenCalledWith jasmine.any Array

  describe 'without data', ->
    beforeEach ->
      ajax =
        open: ->
        send: send '[]'

    it 'invokes callback', ->
      spyOn reactRoot, 'responseReceived'
      (getRequestSender ajax, reactRoot)()
      (expect reactRoot.responseReceived).toHaveBeenCalledWith []