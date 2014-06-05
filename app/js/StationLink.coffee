window.StationLink = React.createClass
  render: () ->
    return React.DOM.li
      className: 'siteid'
      onClick: () =>
        requestSender = getRequestSender new XMLHttpRequest(), reactRoot
        requestSender @props.SiteId
        reactRoot.requestIsPending()
      names.abbreviate(@props.StopAreaName or @props.SiteId)