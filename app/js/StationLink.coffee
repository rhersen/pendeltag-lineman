window.StationLink = React.createClass
  render: () ->
    return React.DOM.li
      className: 'siteid'
      onClick: () =>
        requestSender = getRequestSender new XMLHttpRequest(), reactRoot
        requestSender @props.number
        reactRoot.requestIsPending()
      names.get @props.number