describe 'StationLink', ->
    beforeEach(->
        $('<div id="jasmine_content"></div>').appendTo('body'))

    it 'renders only number if there is no name', ->
        subject = StationLink
            key: 9524
        result = jasmineReact.renderComponent subject
        (expect result._renderedComponent.props.children).toEqual 9524

    it 'renders number and name', ->
        subject = StationLink
            key: 9525
            StopAreaName: 'Tulling'
        result = jasmineReact.renderComponent subject
        (expect result._renderedComponent.props.children).toEqual 'Tulling'
