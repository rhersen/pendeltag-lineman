function sendRequest(id) {
    function handleResult(resultTrains) {
        reactRoot.setState({responseTime: new Date().getTime()});
        reactRoot.setState({trains: resultTrains});
        reactRoot.setState({current: parseInt(_.first(resultTrains).SiteId, 10)});
    }

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

var StationLink = React.createClass({
    render: function() {
        var self = this;

        return React.DOM.span({
                className: 'siteid',
                onClick: function() {
                    sendRequest(self.props.number);
                    reactRoot.requestIsPending();
                }
            },
            this.props.number);
    }
});
