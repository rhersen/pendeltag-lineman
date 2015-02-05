window.MainMenu = React.createClass({
    getInitialState: function () {
        return {
            stations: {
                northwest: [],
                northeast: [],
                central: [],
                southwest: [],
                southeast: []
            }
        };
    },

    componentDidMount: function () {
        getStations(this.handleStations);
    },

    handleStations: function (stations) {
        this.setState({
            stations: stations
        });
    },

    render: function () {
        return React.DOM.div({},
            React.DOM.nav({
                className: 'pull-left',
                children: _.map(_.initial(this.state.stations.northwest, 1), StationLink)
            }),
            React.DOM.nav({
                className: 'pull-right',
                children: _.map(_.initial(this.state.stations.northeast, 1), StationLink)
            }),
            React.DOM.nav({
                className: 'pull-left narrow',
                children: _.map(_.last(this.state.stations.northwest, 1), StationLink)
            }),
            React.DOM.nav({
                className: 'center',
                children: _.map(_.first(this.state.stations.central, 1), StationLink)
            }),
            React.DOM.nav({
                className: 'pull-right narrow',
                children: _.map(_.last(this.state.stations.northeast, 1), StationLink)
            }),
            React.DOM.nav({
                className: 'center wide',
                children: _.map(_.rest(_.initial(this.state.stations.central)), StationLink)
            }),
            React.DOM.nav({
                className: 'pull-left narrow',
                children: _.map(this.state.stations.southwest, StationLink)
            }),
            React.DOM.nav({
                className: 'center',
                children: _.map(_.last(this.state.stations.central, 1), StationLink)
            }),
            React.DOM.nav({
                className: 'pull-right narrow',
                children: _.map(this.state.stations.southeast, StationLink)
            }));
    }
});
