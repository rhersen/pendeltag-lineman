describe 'getRequestSender', ->
  ajax = null
  reactRoot = null

  beforeEach ->
    affix('div#jasmine_content')
    ajax =
      open: ->
      send: ->
        @readyState = 4
        @status = 200
        @responseText = '[{"SiteId": 9525}]'
        @onreadystatechange()
    reactRoot =
      setState: ->

  it 'calls open', ->
    spyOn ajax, 'open'
    (getRequestSender ajax, reactRoot)(9525)
    ((expect ajax.open).toHaveBeenCalledWith 'GET', '/departures/9525', true)

  it 'invokes callback', ->
    spyOn reactRoot, 'setState'
    (getRequestSender ajax, reactRoot)()
    (expect reactRoot.setState).toHaveBeenCalledWith
      responseTime: jasmine.any Number
      current: jasmine.any Number
      trains: [
        "SiteId": 9525
      ]