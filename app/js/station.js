/*global time: false, names: false, countdown: false, $: false, _: false */

var MainMenu = React.createClass({
    render: function() {
        function span(number, name) {
            return React.DOM.span({
                    id: name,
                    className: 'siteid',
                    onClick: function() {
                        return station.getRequestSender(number)();
                    }
                },
                number);
        }

        var spans = _.map({
                karlberg: '9510',
                sodertalje: '9520',
                tullinge: '9525',
                sodra: '9530'
            },
            span);

        return React.DOM.nav({children: spans});
    }
});

var RefreshMenu = React.createClass({
    render: function() {
        function span(number, name) {
            return React.DOM.span({
                    id: name,
                    className: 'siteid',
                    onClick: function() {
                        return station.getRequestSender(number)();
                    }
                },
                number);
        }

        var spans = _.map({
                pred: this.props.current - 1,
                curr: this.props.current,
                succ: this.props.current + 1
            },
            span);

//            $('#title').html(names.abbreviate(_.first(trains).StopAreaName));

        return React.DOM.nav({children: spans});
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
        var children4 = this.state.current ? [RefreshMenu({current: this.state.current})].concat(children3) : children3;
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
