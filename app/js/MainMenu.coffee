window.MainMenu = React.createClass
  getInitialState: () ->
    stations: [ {SiteId: '9506'}, {SiteId: '9520'} ]

  componentDidMount: () ->
    self = this
    request = new XMLHttpRequest()
    request.open 'GET', '/stations', true

    request.onload = () ->
      if @status >= 200 and @status < 400
        self.handleStations JSON.parse @response

    request.send()

  handleStations: (stations) ->
    @setState stations: stations

  render: () ->
    return React.DOM.nav
      children: _.map @state.stations, (el) -> return StationLink el