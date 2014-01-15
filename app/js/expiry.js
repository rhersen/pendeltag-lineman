/*global time: false, countdown: false */

var Expiry = React.createClass({
    getInitialState: function() {
        return {
            requestTime: undefined,
            responseTime: undefined
        };
    },

    render: function() {
        var now = new Date().getTime();
        var timeSinceRequest = this.getTimeSinceRequest(now);
        var timeSinceResponse = this.getTimeSinceResponse(now);
        return React.DOM.span({
            className: this.isPending() ? 'pending' : undefined,
            children: timeSinceRequest.toFixed(1) + '/' + timeSinceResponse.toFixed(1)
        });
    },

    getTimeSinceRequest: function(now) {
        return time.diff(now, this.state.requestTime);
    },

    getTimeSinceResponse: function(now) {
        return time.diff(now, this.state.responseTime);
    },

    isPending: function() {
        return !this.state.responseTime || this.state.responseTime < this.state.requestTime;
    }

});
