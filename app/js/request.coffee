window.getRequestSender = (ajax, reactRoot) ->
  handleResult = (resultTrains) ->
    reactRoot.responseReceived(resultTrains)

  (id) ->
    callback = () ->
      if (ajax.readyState is 4)
        if (ajax.status is 200)
          handleResult JSON.parse ajax.responseText

        if (ajax.status is 401)
          reactRoot.setState unauthorized: true

    reactRoot.requestSent()
    ajax.onreadystatechange = callback
    ajax.open "GET", '/departures/' + id, true
    ajax.send()
