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
        return React.DOM.div({},
            MainMenu(),
            Expiry({requestTime: this.state.requestTime, responseTime: this.state.responseTime}),
            Table({trains: this.state.trains, now: this.state.now})
        );
    }
});

function createStation() {
    function setResult(resultTrains, currentTimeMillis) {
        function updateTimer() {
            reactRoot.setState({responseTime: currentTimeMillis});
        }

        function getSiteId() {
            return parseInt(_.first(trains).SiteId, 10);
        }

        function getPredecessor() {
            return getSiteId() - 1;
        }

        function getCurrent() {
            return getSiteId() + 0;
        }

        function getSuccessor() {
            return getSiteId() + 1;
        }

        function updateHtml() {
            $('#title').html(names.abbreviate(_.first(trains).StopAreaName));
            $('#predecessor').html(getPredecessor());
            $('#successor').html(getSuccessor());
        }

        function updateTable() {
            reactRoot.setState({trains: trains});
        }

        function bindEvent() {
            var ev = 'mouseup';
            $('#predecessor').bind(ev, getRequestSender(getPredecessor()));
            $('#title').bind(ev, getRequestSender(getCurrent()));
            $('#successor').bind(ev, getRequestSender(getSuccessor()));
        }

        trains = resultTrains;

        updateTimer();
        updateHtml();
        updateTable();
        bindEvent();
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
        $('#title').unbind('mouseup touchend').html(id);
        $('#predecessor').unbind('mouseup touchend').html(' ');
        $('#successor').unbind('mouseup touchend').html(' ');

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
