describe 'MainMenu', ->
  beforeEach(->
    $('<div id="jasmine_content"></div>').appendTo('body'))

  it 'gets two children from initial state', ->
    subject = MainMenu()
    result = jasmineReact.renderComponent subject
    expect(result._renderedComponent.props.children.length).toEqual 2

  it 'gets one child from set state', ->
    subject = MainMenu()
    result = jasmineReact.renderComponent subject
    subject.setState stations: [9524]
    expect(result._renderedComponent.props.children.length).toEqual 1