describe 'countdown', ->
    it 'should handle less than one minute', ->
        expect(countdown.getCountdown("2013-01-02T17:41:00", new Date(1322152807741))).toBe '0:52.2'

    it 'should handle less than two minutes', ->
        expect(countdown.getCountdown("2013-01-02T17:41:00", new Date(1322152747147))).toBe '1:52.8'

    it 'should round tenths to zero', ->
        expect(countdown.getCountdown("2013-01-02T17:41:00", new Date(1322152747000))).toBe '1:53.0'

    it 'should handle departures next hour', ->
        expect(countdown.getCountdown("2013-01-02T18:01:00", new Date(1322152747000))).toBe '21:53.0'

    it 'should handle departures far into next hour', ->
        expect(countdown.getCountdown("2013-01-02T18:39:00", new Date(1322153707000))).toBe '43:53.0'

    it 'should handle train that has just departed', ->
        date = new Date(1322152860100)
        date.getTimezoneOffset = -> return -60
        expect(countdown.getCountdown("2013-01-02T17:41:00", date)).toBe '-0:00.1'

    it 'should handle train that departed a minute ago', ->
        date = new Date(1322152860100)
        date.getTimezoneOffset = -> return -60
        expect(countdown.getCountdown("2013-01-02T17:40:00", date)).toBe '-1:00.1'

    it 'should handle departures almost an hour from now', ->
        expect(countdown.getCountdown("2013-01-02T18:40:00", new Date(1322152860100))).toBe '58:59.9'

    it 'should handle train that departs exactly now', ->
        expect(countdown.getCountdown("2013-01-02T17:41:00", new Date(1322152860000))).toBe '0:00.0'

    it 'should handle hour without leading zero', ->
        expect(countdown.millisSinceMidnight("2013-01-02T05:00:00"), 18000000);
