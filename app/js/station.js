/*global time: false, expiry: false, names: false, countdown: false, $: false, _: false */

function createStation(isTouch) {
    function updatePending() {
        if (timer.isPending()) {
            $('body').addClass('pending');
        } else {
            $('body').removeClass('pending');
        }
    }

    function setResult(trains, currentTimeMillis) {
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
            $('section.table time').remove();
            $('span.destination').remove();
            $('span.countdown').remove();
            _.each(trains, createDivRow);
        }

        function createDivRow(departure) {
            var dir = 'direction' + departure.JourneyDirection;
            var dateTime = departure.ExpectedDateTime;
            var table = $('.table');
            $('<time></time>')
                .appendTo(table)
                .html(time.getTime(dateTime))
                .addClass(dir);
            $('<span></span>').appendTo(table)
                .html(names.abbreviate(departure.Destination))
                .addClass('destination')
                .addClass(dir);
            $('<span></span>').appendTo(table)
                .addClass('countdown')
                .addClass(dir)
                .data('time', departure.ExpectedDateTime);
        }

        function bindEvent() {
            var ev = isTouch ? 'touchend' : 'mouseup';
            $('#predecessor').bind(ev, getRequestSender(getPredecessor()));
            $('#title').bind(ev, getRequestSender(getCurrent()));
            $('#successor').bind(ev, getRequestSender(getSuccessor()));
        }

        updateTimer();
        updatePending();
        updateHtml();
        updateTable();
        bindEvent();
    }

    function getRequestSender(id) {
        return function () {
            sendRequest(id);
            $('nav#stations').hide();
            if (!intervalId) {
                intervalId = setInterval(tick, 256);
            }
        };
    }

    function init(interval) {
        var ev = isTouch ? 'touchend' : 'mouseup';
        $('#karlberg').bind(ev, getRequestSender('9510'));
        $('#sodertalje').bind(ev, getRequestSender('9520'));
        $('#tullinge').bind(ev, getRequestSender('9525'));
        $('#sodra').bind(ev, getRequestSender('9530'));

        if (isTouch) {
            $('.table').addClass('touch');
        } else {
            $('.table').addClass('mouse');
        }

        $('span.clear').click(function () {
            clearInterval(intervalId);
            intervalId = false;
            $('nav#stations').show();
        });

        if (interval) {
            intervalId = setInterval(tick, interval);
        }
    }

    function tick() {
        function setCountdowns() {
            var now = new Date();

            $('span.countdown').each(function () {
                var time = $(this).data('time');
                $(this).html(countdown.getCountdown(time, now));
            });
        }

        $('#expired').html((timer.getDebugString()));

        setCountdowns();

        if (timer.isExpired(new Date())) {
            sendRequest($('span#id').text());
        }
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
            success: function (result) {
                setResult(result.DPS.Trains.DpsTrain, new Date().getTime());
            }
        });

        $('span#id').text(id);
    }

    var timer = expiry.create();
    var intervalId;

    return {
        setResult: setResult,
        init: init
    };
}
