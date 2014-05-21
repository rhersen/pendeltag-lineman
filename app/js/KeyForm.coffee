window.KeyForm = React.createClass
  render: () ->
    return React.DOM.div {},
      React.DOM.h1 {}, 'unauthorized'
      React.DOM.input ref: 'key'
      React.DOM.button
        onClick: @post
        'post'

  post: () ->
    request = new XMLHttpRequest()
    request.open('POST', '/key', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send "key=#{ @refs.key.getDOMNode().value }";