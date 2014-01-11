/*global time: false, expiry: false, names: false, countdown: false, $: false, _: false */

function createStation() {
    function updatePending() {
        if (timer.isPending()) {
            $('body').addClass('pending');
        } else {
            $('body').removeClass('pending');
        }
    }

    function setResult(resultTrains, currentTimeMillis) {
        function updateTimer() {
            timer.setResponse(currentTimeMillis);
            timer.setUpdated(trains.updated);
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
            $('#updated').html(trains.updated);
        }

        function updateTable() {
            React.renderComponent(Table({trains: trains}), document.getElementById('table'));
        }

        function bindEvent() {
            var ev = 'mouseup';
            $('#predecessor').bind(ev, getRequestSender(getPredecessor()));
            $('#title').bind(ev, getRequestSender(getCurrent()));
            $('#successor').bind(ev, getRequestSender(getSuccessor()));
        }

        trains = resultTrains;

        updateTimer();
        updatePending();
        updateHtml();
        updateTable();
        bindEvent();
    }

    function getRequestSender(id) {
        return function() {
            sendRequest(id);
            $('nav#stations').hide();
            if (!intervalId) {
                intervalId = setInterval(tick, 256);
            }
        };
    }

    function init(interval) {
        var ev = 'mouseup';
        $('#karlberg').bind(ev, getRequestSender('9510'));
        $('#sodertalje').bind(ev, getRequestSender('9520'));
        $('#tullinge').bind(ev, getRequestSender('9525'));
        $('#sodra').bind(ev, getRequestSender('9530'));

        $('#table').addClass('mouse');

        $('span.clear').click(function() {
            clearInterval(intervalId);
            intervalId = false;
            $('nav#stations').show();
        });

        if (interval) {
            intervalId = setInterval(tick, interval);
        }
    }

    function tick() {
        $('#expired').html((timer.getDebugString()));

        React.renderComponent(Table({trains: trains}), document.getElementById('table'));
    }

    function sendRequest(id) {
        timer.setRequest(new Date().getTime());
        updatePending();
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

        $('span#id').text(id);
    }

    var timer = expiry.create();
    var intervalId;
    var trains = [];

    return {
        setResult: setResult,
        init: init
    };
}
