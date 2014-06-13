window.RefreshMenu = React.createClass
  render: () ->
    c = @props.current;
    React.DOM.nav {
        className: 'refresh'
      },
      StationLink({SiteId: c - 1}),
      StationLink(
        className: 'current'
        SiteId: c
        StopAreaName: @props.StopAreaName
      ),
      StationLink({SiteId: c + 1}),
      React.DOM.div({className: 'link', onClick: @props.clear}, 'Klar')