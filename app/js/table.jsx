/** @jsx React.DOM */

var TableRow = React.createClass({
    getTime: function (dateTime) {
        var zeroSeconds = /^.*T(.+):00$/.exec(dateTime);
        if (zeroSeconds) {
            return zeroSeconds[1];
        }
        var nonZeroSeconds = /^.*T(.+)$/.exec(dateTime);
        if (nonZeroSeconds) {
            return nonZeroSeconds[1];
        }
        return dateTime;
    },

    render: function () {
        var dateTime = this.props.train.ExpectedDateTime;
        return <div className={'direction' + this.props.train.JourneyDirection}>
            <time>{this.getTime(dateTime)}</time>
            <span className="destination">{abbreviate(this.props.train.Destination)}</span>
            <Countdown dateTime={dateTime} now={this.props.now} />
        </div>;
    }
});

var Table = React.createClass({
    render: function () {
        var now = this.props.now;
        return <div className="table">{this.props.trains.map(tableRow)}</div>;

        function tableRow(train) {
            return <TableRow train={train} now={now} key={train.Key} />
        }
    }
});
