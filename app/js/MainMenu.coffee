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
    links = _.map @state.stations, (el) -> return StationLink el
    return React.DOM.div {},
      React.DOM.nav className: 'pull-left', children: links[0...8]
      React.DOM.nav className: 'pull-right', children: links[8...16]
      React.DOM.nav className: 'center', children: links[16...21]
      React.DOM.nav className: 'pull-left', children: links[21...30]
      React.DOM.nav className: 'pull-right', children: links[30...39]