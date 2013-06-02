window.time = {
  diff: (toMillis, fromMillis) ->
    (toMillis - fromMillis) / 1000
  getTime: (dateTime) ->
    firstMatch = (re, fallback) ->
      match = re.exec(dateTime)
      if match then match[1] else fallback
    firstMatch(/^.*T(.+):00$/, firstMatch(/^.*T(.+)$/, dateTime))
}
