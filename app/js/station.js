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

    render: function() {
        var children = [
            MainMenu(),
            Expiry({requestTime: this.state.requestTime, responseTime: this.state.responseTime}),
            Table({trains: this.state.trains, now: this.state.now})
        ];
        return React.DOM.div({children: this.state.current ? [RefreshMenu({current: this.state.current})].concat(children) : children});
    }
});

function createStation() {
    function setResult(resultTrains, currentTimeMillis) {
        function updateTimer() {
            reactRoot.setState({responseTime: currentTimeMillis});
        }

//            $('#title').html(names.abbreviate(_.first(trains).StopAreaName));

        function updateTable() {
            reactRoot.setState({trains: trains});
            reactRoot.setState({current: parseInt(_.first(trains).SiteId, 10)});
        }

        trains = resultTrains;

        updateTimer();
        updateTable();
    }

    function getRequestSender(id) {
        return function() {
            sendRequest(id);
//            $('nav#stations').hide();
            if (!intervalId) {
                intervalId = setInterval(tick, 256);
            }
        };
    }

    function init() {
        $('span.clear').click(function() {
            clearInterval(intervalId);
            intervalId = false;
        });
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
                setResult(result.DPS.Trains.DpsTrain, new Date().getTime());
            }
        });
    }

    var reactRoot = Station();
    var intervalId;
    var trains = [];

    React.renderComponent(reactRoot, document.getElementById('mountpoint'));

    return {
        setResult: setResult,
        init: init,
        getRequestSender: getRequestSender
    };
}
