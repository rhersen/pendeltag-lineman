/*global time: false, countdown: false */

var Expiry = React.createClass({
    render: function() {
        if (!this.props.requestTime) {
            return React.DOM.div();
        }
        var now = new Date().getTime();
        var timeSinceRequest = this.getTimeSinceRequest(now);
        var timeSinceResponse = this.getTimeSinceResponse(now);
        return React.DOM.span({
            children: timeSinceRequest.toFixed(1) + '/' + timeSinceResponse.toFixed(1)
        });
    },

    getTimeSinceRequest: function(now) {
        return time.diff(now, this.props.requestTime);
    },

    getTimeSinceResponse: function(now) {
        return time.diff(now, this.props.responseTime);
    }
});
