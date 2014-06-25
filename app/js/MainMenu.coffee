window.MainMenu = React.createClass
  getInitialState: () ->
    stations: {northwest:[ {SiteId: '9506'}, {SiteId: '9520'} ]}

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
    return React.DOM.div {},
      React.DOM.nav className: 'pull-left', children: _.map @state.stations.northwest, (el) -> StationLink el
      React.DOM.nav className: 'pull-right', children: _.map @state.stations.northeast, (el) -> StationLink el
      React.DOM.nav className: 'center', children: _.map @state.stations.central, (el) -> StationLink el
      React.DOM.nav className: 'pull-left', children: _.map @state.stations.southwest, (el) -> StationLink el
      React.DOM.nav className: 'pull-right', children: _.map @state.stations.southeast, (el) -> StationLink el