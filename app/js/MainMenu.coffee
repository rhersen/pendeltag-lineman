window.MainMenu = React.createClass
  getInitialState: () ->
    stations: {
      northwest:[]
      northeast:[]
      central:[]
      southwest:[]
      southeast:[]
    }

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
      React.DOM.nav className: 'pull-left', children: (StationLink s for s in @state.stations.northwest[0...-1])
      React.DOM.nav className: 'pull-right', children: (StationLink s for s in @state.stations.northeast[0...-1])
      React.DOM.nav className: 'pull-left narrow', children: (StationLink s for s in @state.stations.northwest[-1...])
      React.DOM.nav className: 'center', children: (StationLink s for s in @state.stations.central[...1])
      React.DOM.nav className: 'pull-right narrow', children: (StationLink s for s in @state.stations.northeast[-1...])
      React.DOM.nav className: 'center wide', children: (StationLink s for s in @state.stations.central[1...-1])
      React.DOM.nav className: 'pull-left narrow', children: (StationLink s for s in @state.stations.southwest)
      React.DOM.nav className: 'center', children: (StationLink s for s in @state.stations.central[-1...])
      React.DOM.nav className: 'pull-right narrow', children: (StationLink s for s in @state.stations.southeast)
