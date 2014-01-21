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
        var collection = {};

        collection[this.props.current - 1] = this.props.current - 1;
        collection[names.abbreviate(_.first(this.props.trains).StopAreaName)] = this.props.current;
        collection[this.props.current + 1] = this.props.current + 1;

        return React.DOM.nav({children: _.map(collection, span)});
    }
});

var Station = React.createClass({
    getInitialState: function() {
        return {
            trains: [],
            requestTime: undefined,
            responseTime: undefined,
            now: new Date()
        };
    },

    clear: function() {
        clearInterval(this.state.intervalId);
        this.setState({intervalId: undefined});
    },

    render: function() {
        var children3 = [
            MainMenu(),
            Expiry({requestTime: this.state.requestTime, responseTime: this.state.responseTime}),
            Table({trains: this.state.trains, now: this.state.now})
        ];
        var children4 = this.state.current ? [RefreshMenu({current: this.state.current, trains: this.state.trains})].concat(children3) : children3;
        return React.DOM.div({children: [React.DOM.span({onClick: this.clear}, '◼')].concat(children4)});
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
