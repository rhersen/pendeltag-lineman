var TableRow = React.createClass({
    render: function() {
        var dateTime = this.props.train.ExpectedDateTime;
        return React.DOM.div({
            className: 'direction' + this.props.train.JourneyDirection,
            children: [
                React.DOM.time({}, time.getTime(dateTime)),
                React.DOM.span({className: 'destination'}, names.abbreviate(this.props.train.Destination)),
                React.DOM.span({className: 'countdown'}, countdown.getCountdown(dateTime, this.props.now))
            ]
        });
    }
});

var Table = React.createClass({
    render: function() {
        var now = this.props.now;
        return React.DOM.div({className: 'table', children: this.props.trains.map(function(train) {
            return TableRow({train: train, now: now});
        })});
    }
});
