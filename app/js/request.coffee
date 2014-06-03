window.getRequestSender = (ajax, reactRoot) ->
  handleResult = (resultTrains) ->
    first = _.first(resultTrains)
    reactRoot.setState
      responseTime: new Date().getTime(),
      trains: resultTrains,
      current: if first then parseInt first.SiteId, 10 else 0
      StopAreaName: if first then first.StopAreaName else ''

  (id) ->
    callback = () ->
      if (ajax.readyState is 4)
        if (ajax.status is 200)
          handleResult JSON.parse ajax.responseText

        if (ajax.status is 401)
          reactRoot.setState unauthorized: true

    reactRoot.setState
      requestTime: new Date().getTime()
      now: new Date()
    ajax.onreadystatechange = callback
    ajax.open "GET", '/departures/' + id, true
    ajax.send()
