window.getRequestSender = (ajax, reactRoot) ->
  handleResult = (resultTrains) ->
    reactRoot.setState
      responseTime: new Date().getTime(),
      trains: resultTrains,
      current: parseInt _.first(resultTrains).SiteId, 10

  (id) ->
    callback = () ->
      if (ajax.readyState is 4)
        if (ajax.status is 200)
          handleResult JSON.parse ajax.responseText

        if (ajax.status is 401)
          reactRoot.setState unauthorized: true

    reactRoot.setState requestTime: new Date().getTime()
    ajax.onreadystatechange = callback
    ajax.open "GET", '/departures/' + id, true
    ajax.send()
