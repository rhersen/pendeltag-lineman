describe 'StationLink', ->
    beforeEach(->
        $('<div id="jasmine_content"></div>').appendTo('body'))

    it 'renders only number if there is no name', ->
        subject = StationLink
            number: 9524
        result = jasmineReact.renderComponent subject
        (expect result._renderedComponent.props.children).toEqual 9524

    it 'renders number and name', ->
        subject = StationLink
            number: 9525
            name: 'Tullinge'
        result = jasmineReact.renderComponent subject
        (expect result._renderedComponent.props.children).toEqual 'Tullinge'
