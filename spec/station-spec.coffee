describe 'station', ->
    beforeEach( -> $('<nav> <span id="sodertalje" class="siteid">9520</span> <span id="predecessor" class="siteid">9524</span> <span id="title" class="siteid">Tullinge</span> <span id="successor" class="siteid">9526</span> <span id="sodra" class="siteid">9530</span> </nav> <header> <span id="id">9525</span> <time id="updated">14:48:01</time> <button class="clear">⎚</button> <span id="expired">12.4⊂12.3⊃11.0</span> </header> <section class="table"> <span class="time">14:52:00</span> <span class="destination">Märsta</span> <span class="countdown">3:46.5</span> <span class="time">15:07:00</span> <span class="destination">Märsta</span> <span class="countdown">18:46.5</span> </section>').appendTo('body'))
    afterEach( ->
         $('nav').remove()
         $('header').remove()
         $('section').remove())

    fixture = [
        {
            JourneyDirection: 2,
            "Destination": "Märsta",
            "SiteId": "9526",
            "StopAreaName": "Femlingsberg",
            "ExpectedDateTime": "2013-01-02T13:37:00"
        },
        {
            JourneyDirection: 1,
            "Destination": "Östertälje",
            "ExpectedDateTime": "2013-01-02T13:47:00",
            "SiteId": "9526",
            "StopAreaName": "Femlingsberg"
        }
    ]

    it 'should remove table rows', ->
        createStation().setResult([{
                JourneyDirection: 2,
                "Destination": "Märsta",
                "SiteId": "9526",
                "StopAreaName": "Femlingsberg",
                "ExpectedDateTime": "2013-01-02T13:37:00"
            }])
        expect($('span.countdown').length).toBe 1

    it 'should set station name', ->
        createStation().setResult(fixture)
        expect($('#title').html()).toBe 'Femlingsberg'

    it 'should set previous station', ->
        createStation().setResult(fixture)
        expect($('#predecessor').html()).toBe '9525'

    it 'should set next station', ->
        createStation().setResult(fixture)
        expect($('#successor').html()).toBe '9527'

    it 'should set departure time', ->
        createStation().setResult(fixture)
        expect($('.table').find('time').html()).toBe '13:37'

    it 'should set direction class', ->
        createStation().setResult(fixture)
        expect($('.table .direction1').length).toBe 3
        expect($('.table .direction2').length).toBe 3

    it 'should bind mouseup', ->
        createStation(false).setResult(fixture)
        expect($('#successor').data('events')).toBeDefined()
        expect($('#predecessor').data('events')).toBeDefined()

    it 'should bind touchend', ->
        createStation(true).setResult(fixture)
        expect($('#successor').data('events')).toBeDefined()
        expect($('#predecessor').data('events')).toBeDefined()