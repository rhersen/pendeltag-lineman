/*global time: false, names: false, countdown: false, _: false */

function stationLink(number, name) {

    function handleResult(result) {
        var resultTrains = result.DPS.Trains.DpsTrain;
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

var MainMenu = React.createClass({
    render: function() {
        var stations = {
            krlbg: '9510',
            stlje: '9520',
            tlnge: '9525',
            sodra: '9530'
        };

        return React.DOM.nav({children: _.map(stations, stationLink)});
    }
});

var RefreshMenu = React.createClass({
    getStations: function(c) {
        var stations = {};

        stations[c - 1] = c - 1;
        stations[names.abbreviate(_.first(this.props.trains).StopAreaName)] = c;
        stations[c + 1] = c + 1;

        return stations;
    },

    render: function() {
        var stations = this.getStations(this.props.current);

        return React.DOM.nav({children: _.map(stations, stationLink)});
    }
});

var Station = React.createClass({
    getInitialState: function() {
        return {
            trains: [],
            requestTime: undefined,
            responseTime: undefined,
            intervalId: undefined,
            now: new Date()
        };
    },

    clear: function() {
        clearInterval(this.state.intervalId);
        this.setState({intervalId: undefined});
    },

    render: function() {
        return React.DOM.div({
            className: this.isPending() ? 'pending' : undefined,
            children: _.compact([
                this.state.intervalId ? React.DOM.span({onClick: this.clear}, 'stopp') : MainMenu(),
                this.state.current && RefreshMenu({current: this.state.current, trains: this.state.trains}),
                this.state.intervalId && Expiry({requestTime: this.state.requestTime, responseTime: this.state.responseTime}),
                Table({trains: this.state.trains, now: this.state.now})
            ])
        });
    },

    isPending: function() {
        return !this.state.responseTime || this.state.responseTime < this.state.requestTime;
    }
});