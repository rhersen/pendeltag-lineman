function stationLink(number, name) {

    function handleResult(resultTrains) {
        reactRoot.setState({responseTime: new Date().getTime()});
        reactRoot.setState({trains: resultTrains});
        reactRoot.setState({current: parseInt(_.first(resultTrains).SiteId, 10)});
    }

    function sendRequest(id) {
        function callback() {
            if (ajax.readyState === 4 && ajax.status === 200) {
                handleResult(JSON.parse(ajax.responseText));
            }
        }

        reactRoot.setState({requestTime: new Date().getTime()});

        var ajax = new XMLHttpRequest();

        ajax.onreadystatechange = callback;
        ajax.open("GET", '/departures/' + id, true);
        ajax.send();
    }

    return React.DOM.span({
            id: name,
            className: 'siteid',
            onClick: function() {
                function tick() {
                    reactRoot.setState({now: new Date()});
                }

                sendRequest(number);

                if (!reactRoot.state.intervalId) {
                    reactRoot.setState({intervalId: setInterval(tick, 256)});
                }
            } },
        name);
}
