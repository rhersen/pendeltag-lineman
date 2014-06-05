describe 'MainMenu', ->
  beforeEach(->
    $('<div id="jasmine_content"></div>').appendTo('body')
  )

  getNumber = (child) ->
    child.props.SiteId

  it 'gets one child from object array', ->
    subject = MainMenu()
    result = jasmineReact.renderComponent subject
    subject.setState stations: [ SiteId: '9524' ]
    expect(getNumber result._renderedComponent.props.children[0].props.children[0]).toBe '9524'