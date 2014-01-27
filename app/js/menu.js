var MainMenu = React.createClass({
    render: function() {
        var stations = [
            '9510',
            '9520',
            '9525',
            '9530'
        ];

        return React.DOM.nav({children: _.map(stations, function (number) {
            return StationLink({number: number});
        })});
    }
});

var RefreshMenu = React.createClass({
    getStations: function(c) {
        return [c - 1, c, c + 1];
    },

    render: function() {
        var stations = this.getStations(this.props.current);

        return React.DOM.nav({children: _.map(stations, function (number) {
            return StationLink({number: number});
        })});
    }
});
