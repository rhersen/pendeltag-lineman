describe 'getRequestSender', ->
    ajax = null
    reactRoot = null

    beforeEach ->
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
            trains:[
                "SiteId": 9525
            ]