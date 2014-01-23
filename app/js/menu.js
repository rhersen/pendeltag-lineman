var MainMenu = React.createClass({
    render: function() {
        var stations = {
            krlbg: '9510',
            stlje: '9520',
            tlnge: '9525',
            sodra: '9530'
        };

        return React.DOM.nav({children: _.map(stations, stationLink)});
    }
});

var RefreshMenu = React.createClass({
    getStations: function(c) {
        var stations = {};

        stations[c - 1] = c - 1;
        stations[names.abbreviate(_.first(this.props.trains).StopAreaName)] = c;
        stations[c + 1] = c + 1;

        return stations;
    },

    render: function() {
        var stations = this.getStations(this.props.current);

        return React.DOM.nav({children: _.map(stations, stationLink)});
    }
});
