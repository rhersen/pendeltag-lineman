describe 'time.diff', ->
    it 'should calculate difference in seconds', ->
        expect(time.diff(3333, 1000).toString()).toBe '2.333'
        expect(time.diff(3133, 1000).toString()).toBe '2.133'

    it 'should return hour and minute if seconds are zero', ->
        expect(time.getTime('2013-01-02T13:37:00')).toBe '13:37'

    it 'should return seconds too if non-zero', ->
        expect(time.getTime('2013-01-02T13:37:17')).toBe '13:37:17'
