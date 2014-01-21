/*global time: false, names: false, countdown: false, $: false, _: false */

function span(number, name) {
    return React.DOM.span(
        {
            id: name,
            className: 'siteid',
            onClick: function() {
                return station.getRequestSender(number)();
            }
        },
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
            span);

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

        return React.DOM.nav({children: _.map(stations, span)});
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
        var children = [
            this.state.intervalId ? React.DOM.span({onClick: this.clear}, '◼') : MainMenu(),
            this.state.current && RefreshMenu({current: this.state.current, trains: this.state.trains}),
            Expiry({requestTime: this.state.requestTime, responseTime: this.state.responseTime}),
            Table({trains: this.state.trains, now: this.state.now})
        ];
        return React.DOM.div({children: _.compact(children)});
    }
});

function createStation() {
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

        $.ajax({
            url: '/departures/' + id,
            dataType: 'json',
            cache: false,
            success: function(result) {
                var resultTrains = result.DPS.Trains.DpsTrain;
                reactRoot.setState({responseTime: new Date().getTime()});
                reactRoot.setState({trains: resultTrains});
                reactRoot.setState({current: parseInt(_.first(resultTrains).SiteId, 10)});
            }
        });
    }

    var reactRoot = Station();
    React.initializeTouchEvents(true);
    React.renderComponent(reactRoot, document.getElementById('mountpoint'));

    return {
        getRequestSender: getRequestSender
    };
}
