describe 'MainMenu', ->
  beforeEach(->
    $('<div id="jasmine_content"></div>').appendTo('body')
  )

  getNumber = (child) ->
    child.props.number

  it 'gets two children from initial state', ->
    subject = MainMenu()
    result = jasmineReact.renderComponent subject
    expect(result._renderedComponent.props.children.map getNumber).toEqual ['9506', '9520']

  it 'gets one child from set state', ->
    subject = MainMenu()
    result = jasmineReact.renderComponent subject
    subject.setState stations: [9524]
    expect(getNumber result._renderedComponent.props.children[0]).toBe 9524