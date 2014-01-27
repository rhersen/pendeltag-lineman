var StationLink = React.createClass({

    handleResult: function(resultTrains) {
        reactRoot.setState({responseTime: new Date().getTime()});
        reactRoot.setState({trains: resultTrains});
        reactRoot.setState({current: parseInt(_.first(resultTrains).SiteId, 10)});
    },

    sendRequest: function(id) {
        var self = this;

        function callback() {
            if (ajax.readyState === 4 && ajax.status === 200) {
                self.handleResult(JSON.parse(ajax.responseText));
            }
        }

        reactRoot.setState({requestTime: new Date().getTime()});

        var ajax = new XMLHttpRequest();

        ajax.onreadystatechange = callback;
        ajax.open("GET", '/departures/' + id, true);
        ajax.send();
    },

    render: function() {
        var self = this;

        return React.DOM.span({
                className: 'siteid',
                onClick: function() {
                    function tick() {
                        reactRoot.setState({now: new Date()});
                    }

                    self.sendRequest(self.props.number);

                    if (!reactRoot.state.intervalId) {
                        reactRoot.setState({intervalId: setInterval(tick, 256)});
                    }
                } },
            this.props.number);
    }
});
