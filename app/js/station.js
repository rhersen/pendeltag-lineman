/*global time: false, names: false, countdown: false, _: false */

function stationLink(number, name) {

    function getRequestSender(id) {
        return function() {
            sendRequest(id);
            if (!reactRoot.state.intervalId) {
                reactRoot.setState({intervalId: setInterval(tick, 256)});
            }
        };
    }

    function tick() {
        reactRoot.setState({now: new Date()});
    }

    function sendRequest(id) {
        reactRoot.setState({requestTime: new Date().getTime()});

        var ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function() {
            if (ajax.readyState === 4 && ajax.status === 200) {
                var result = JSON.parse(ajax.responseText);
                var resultTrains = result.DPS.Trains.DpsTrain;
                reactRoot.setState({responseTime: new Date().getTime()});
                reactRoot.setState({trains: resultTrains});
                reactRoot.setState({current: parseInt(_.first(resultTrains).SiteId, 10)});
            }
        };

        ajax.open("GET", '/departures/' + id, true);
        ajax.send();
    }

    return React.DOM.span({
            id: name,
            className: 'siteid',
            onClick: getRequestSender(number) },
        name);
}

var MainMenu = React.createClass({
    render: function() {
        var spans = _.map({
                krlbg: '9510',
                stlje: '9520',
                tlnge: '9525',
                sodra: '9530'
            },
            stationLink);

        return React.DOM.nav({children: spans});
    }
});

var RefreshMenu = React.createClass({
    render: function() {
        var stations = {};
        var c = this.props.current;

        stations[c - 1] = c - 1;
        stations[names.abbreviate(_.first(this.props.trains).StopAreaName)] = c;
        stations[c + 1] = c + 1;

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