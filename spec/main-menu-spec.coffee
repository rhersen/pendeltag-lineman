describe 'MainMenu', ->
  beforeEach(->
    $('<div id="jasmine_content"></div>').appendTo('body')
  )

  getNumber = (child) ->
    child.props.SiteId

  it 'gets one child from object array', ->
    subject = MainMenu()
    result = jasmineReact.renderComponent subject
    subject.setState stations:
      northwest: [ SiteId: '9524' ]
      northeast: [ {SiteId: '9625'}, {SiteId: '9624'} ]
    expect(getNumber result._renderedComponent.props.children[0].props.children[0]).toBe '9524'
    expect(getNumber result._renderedComponent.props.children[1].props.children[1]).toBe '9624'