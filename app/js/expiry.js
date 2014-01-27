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

    diff: function diff(toMillis, fromMillis) {
        return (toMillis - fromMillis) / 1000;
    },

    getTimeSinceRequest: function(now) {
        return this.diff(now, this.props.requestTime);
    },

    getTimeSinceResponse: function(now) {
        return this.diff(now, this.props.responseTime);
    }
});
