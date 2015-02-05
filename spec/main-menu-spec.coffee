describe 'MainMenu', ->
  result = null
  c = null

  beforeEach(->
    $('<div id="jasmine_content"></div>').appendTo('body')
    subject = MainMenu()
    spyOn window, 'getStations'
    result = jasmineReact.renderComponent subject
    result.setState stations:
      northwest: [ {SiteId: '9525'}, {SiteId: '9524'}, {SiteId: '9523'} ]
      northeast: [ {SiteId: '9625'}, {SiteId: '9624'}, {SiteId: '9623'} ]
      central: [ {SiteId: '9025'}, {SiteId: '9024'}, {SiteId: '9023'} ]
      southwest: [ {SiteId: '9425'}, {SiteId: '9424'}, {SiteId: '9423'} ]
      southeast: [ {SiteId: '9325'}, {SiteId: '9324'}, {SiteId: '9323'} ]

    c = result._renderedComponent.props.children
  )

  it 'children are where they should be', ->
    getNumber = (child) -> child.props.SiteId
    expect(getNumber c[0].props.children[0]).toBe '9525'
    expect(getNumber c[1].props.children[1]).toBe '9624'

  it 'all but the last of the norths', ->
    expect(c[0].props.children.length).toBe 2
    expect(c[1].props.children.length).toBe 2

  it 'first central between last of the norths', ->
    expect(c[2].props.children.length).toBe 1
    expect(c[3].props.children.length).toBe 1
    expect(c[4].props.children.length).toBe 1

  it 'all but the first and last of central', ->
    expect(c[5].props.children.length).toBe 1

  it 'last central between souths', ->
    expect(c[6].props.children.length).toBe 3
    expect(c[7].props.children.length).toBe 1
    expect(c[8].props.children.length).toBe 3